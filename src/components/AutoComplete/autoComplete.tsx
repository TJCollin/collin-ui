import React, {
  ChangeEvent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import ClassNames from "classnames";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";

export interface DataSourceType {
  value: string;
  label: string;
  [propName: string]: any;
}

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  onSelect?: (data: DataSourceType) => void;
  renderOptions?: (data: DataSourceType) => ReactElement;
  fetchSuggestions: (
    inputVal: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
}

/**
 * Input with autocomplete suggetsions which can be fetched from local or remote.<br>
 * Suggestion list support keyboard events and can be rendered with customized style.<br>
 * Each suggestion item must have `lable` and `value` properties.
 *
 * ### Usage
 *
 * ```javascript
 * import {AutoComplete} from
 * ```
 */
export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const {
    onSelect,
    renderOptions,
    fetchSuggestions,
    value,
    defaultValue,
    ...restProps
  } = props;
  const [inputVal, setInputVal] = useState<string>(
    (value || defaultValue) as string
  );

  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const triggleSearch = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSuggestions, setShow] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const [preSuggestions, setPreSuggestions] = useState<DataSourceType[]>([]);
  const transitionEntered = useRef(false);

  // 防抖
  const debouncedVal = useDebounce(inputVal, 500);
  useClickOutside(listRef, () => {
    setShow(false);
  });
  const handleTransitionExited = () => {
    transitionEntered.current = false;
    setSuggestions(preSuggestions);
  };

  const handleTransitionEntered = () => {
    transitionEntered.current = true;
  };

  // 是否发送请求取决于debouncedVal是否改变
  useEffect(() => {
    if (debouncedVal && triggleSearch.current) {
      setShow(true);
      setSuggestions([]);
      setLoading(true);
      const results = fetchSuggestions(debouncedVal);
      if (results instanceof Promise) {
        results.then((res) => {
          setLoading(false);
          setActiveIndex(0);
          res.length ? setPreSuggestions(res) : setShow(false);
        });
      } else {
        setActiveIndex(0);
        if (transitionEntered.current) {
          setLoading(false);
          results.length ? setPreSuggestions(results) : setShow(false);
        } else {
          setLoading(false);
          results.length ? setSuggestions(results) : setShow(false);
        }
      }
    }
    triggleSearch.current = true;
  }, [debouncedVal, fetchSuggestions]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputVal(value);
    !value && setShow(false);
  };
  const handleClick = (item: DataSourceType) => {
    triggleSearch.current = false;
    setInputVal(item.value);
    setShow(false);
    onSelect && onSelect(item);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions?.length) {
      switch (event.key) {
        case "Escape":
          setShow(false);
          break;
        case "ArrowUp":
          activeIndex > 0 && setActiveIndex(activeIndex - 1);
          break;
        case "ArrowDown":
          activeIndex < suggestions?.length - 1 &&
            setActiveIndex(activeIndex + 1);
          break;
        case "Enter":
          handleClick(suggestions[activeIndex]);
          break;
        default:
          break;
      }
    }
  };

  const renderSuggestionList = () => {
    return (
      <Transition
        in={showSuggestions || loading}
        animation="zoom-in-top"
        timeout={500}
      >
        <ul className="suggestion-list">
          <Transition
            in={loading}
            animation="zoom-in-top"
            timeout={300}
            onEntered={handleTransitionEntered}
            onExited={handleTransitionExited}
          >
            <div className="loading-icon">
              <Icon icon="spinner" spin></Icon>
            </div>
          </Transition>
          {suggestions.map((suggestion, index) => {
            const classes = ClassNames("suggestion-item", {
              "been-actived": index === activeIndex,
            });
            return (
              <li
                className={classes}
                key={index}
                onClick={() => {
                  handleClick(suggestion);
                }}
              >
                {renderOptions ? renderOptions(suggestion) : suggestion.label}
              </li>
            );
          })}
        </ul>
      </Transition>
    );
  };

  return (
    <div className="auto-complete" ref={listRef}>
      <Input
        value={inputVal}
        onChange={handleChange}
        {...restProps}
        onKeyDown={handleKeyDown}
      ></Input>

      {renderSuggestionList()}
    </div>
  );
};

export default AutoComplete;
