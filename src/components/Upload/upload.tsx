import React, { ChangeEvent, useRef, useState } from "react";
import axios from "axios";
import UploadList from "./uploadList";
import ClassName from "classnames";
import Dragger from "./dragger";

export type FileStatus = "ready" | "uploading" | "success" | "error";

export interface UploadProps extends React.HTMLAttributes<HTMLDivElement> {
  action: string;
  beforeUpload?: (file: UploadFile) => boolean | Promise<File>;
  onUploadProgress?: (percentage: number, file: UploadFile) => void;
  onUploadSuccess?: (res: any, file: UploadFile) => void;
  onUploadError?: (err: any, file: UploadFile) => void;
  onFileStatusChange?: (file: UploadFile) => void;
  onFileRemove?: (file: UploadFile) => void;
  defaultFileList?: UploadFile[];
  headers?: { [key: string]: any };
  data?: { [key: string]: any };
  name?: string;
  withCredentials?: boolean;
  accept?: string;
  multiple?: boolean;
  drag?: boolean;
}

export interface UploadFile {
  uid: string;
  status: FileStatus;
  name: string;
  per?: number;
  res?: any;
  err?: any;
  row?: File;
}

/**
 * Upload files by clicking or drag-and-drop.
 *
 * ```javascript
 * import {Upload} from
 * ```
 */
export const Upload: React.FC<UploadProps> = (props) => {
  const {
    action,
    beforeUpload,
    onUploadProgress,
    onUploadSuccess,
    onUploadError,
    onFileStatusChange,
    onFileRemove,
    defaultFileList,
    name,
    headers,
    data,
    withCredentials,
    multiple,
    accept,
    className,
    children,
    drag,
    ...restProps
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadList, setList] = useState<UploadFile[]>(defaultFileList || []);
  const classes = ClassName("upload", className);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files === null) {
      return;
    }
    uploadFiles(files);
    inputRef.current && (inputRef.current.value = "");
  };

  const handleFileRemove = (file: UploadFile) => {
    setList((list) => list.filter((_file) => _file.uid !== file.uid));
    onFileRemove && onFileRemove(file);
  };

  const uploadFiles = (files: FileList) => {
    let uploadFiles = Array.from(files);

    uploadFiles.forEach((file) => {
      const uid = Date.now() + "_upload_file";
      let _file: UploadFile = {
        name: file.name,
        uid: uid,
        status: "ready",
        row: file,
      };
      if (beforeUpload) {
        const res = beforeUpload(_file);
        if (res instanceof Promise) {
          res.then((file) => {
            post(file);
          });
        } else if (res) {
          post(file);
        }
      } else {
        post(file);
      }
    });
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const updateFileList = (_file: UploadFile) => {
    setList((fileList) => {
      return fileList.map((file) => {
        if (file.uid === _file.uid) {
          return { ...file, ..._file };
        } else {
          return file;
        }
      });
    });
  };

  const post = (file: File) => {
    const formData = new FormData();
    formData.append(name || file.name, file);
    data &&
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    const uid = Date.now() + "_upload_file";
    let _file: UploadFile = {
      name: file.name,
      uid: uid,
      status: "ready",
      row: file,
    };

    setList((fileList) => [_file, ...fileList]);
    axios
      .post(action, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: withCredentials,
        onUploadProgress: (e) => {
          const percentage: number =
            Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
            updateFileList({
              ..._file,
              status: "uploading",
              per: percentage,
            });
            onUploadProgress &&
              onUploadProgress(percentage, {
                ..._file,
                status: "uploading",
                per: percentage,
              });
          }
        },
      })
      .then((res) => {
        _file = { ..._file, status: "success", res: res, per: 100 };
        onUploadSuccess && onUploadSuccess(res.data, _file);
        updateFileList({ ..._file, status: "success", res: res, per: 100 });
        onFileStatusChange && onFileStatusChange(_file);
      })
      .catch((err) => {
        console.error(err);
        _file = { ..._file, status: "error", err: err };
        onUploadError && onUploadError(err, _file);
        updateFileList({ ..._file, status: "error", err: err });
        onFileStatusChange && onFileStatusChange(_file);
      });
  };

  const handleDrop = (files: FileList) => {
    uploadFiles(files);
  };

  return (
    <div className={classes} {...restProps}>
      <div onClick={handleClick}>
        {drag ? <Dragger onFile={handleDrop}>{children}</Dragger> : children}
      </div>
      <input
        className="upload-input"
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleChange}
        ref={inputRef}
      />
      <UploadList
        listData={uploadList}
        onRemove={handleFileRemove}
      ></UploadList>
    </div>
  );
};

export default Upload;
