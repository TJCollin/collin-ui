import React from "react";
import { UploadFile } from "./upload";
import Icon from "../Icon/icon";
import ProgressBar from "../ProgressBar/progressBar";

export interface UploadListProps {
  listData: UploadFile[];
  onRemove?: (file: UploadFile) => void;
}

const UploadList: React.FC<UploadListProps> = (props) => {
  const { listData, onRemove } = props;
  return (
    <ul className="upload-list">
      {listData.map((file) => {
        return (
          <li className="upload-list-item" key={file.uid}>
            <div className="file-info">
              <div>
                <span className="upload-list-item-tag">
                  <Icon icon="file"></Icon>
                </span>
                <span className="upload-list-item-name">{file.name}</span>
              </div>
              <span className="upload-list-item-status">
                {(file.status === "ready" || file.status === "uploading") && (
                  <Icon
                    icon="spinner"
                    spin
                    theme="primary"
                    className="upload-list-item-tag"
                  ></Icon>
                )}
                {file.status === "success" && (
                  <Icon icon="check-circle" theme="success"></Icon>
                )}
                {file.status === "error" && (
                  <Icon icon="times-circle" theme="danger"></Icon>
                )}
              </span>

              {onRemove && (
                <span className="upload-list-item-remove">
                  <Icon
                    icon="times"
                    theme="danger"
                    onClick={() => {
                      onRemove(file);
                    }}
                  ></Icon>
                </span>
              )}
            </div>

            {file.status === "uploading" && (
              <ProgressBar percent={file.per || 0}></ProgressBar>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default UploadList;
