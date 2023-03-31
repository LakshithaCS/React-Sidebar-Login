import React, { useRef } from "react";
import {
    FileUploadContainer,
    FormField,
    DragDropText,
    UploadFileBtn,
    FilePreviewContainer,
    ImagePreview,
    PreviewContainer,
    PreviewList,
    FileMetaData,
    RemoveFileIcon,
    VideoPreview,
} from "./file-upload.styles";
import { useField, useFormikContext } from "formik";
import { Typography } from "@mui/material";
import { IMAGE_SIZE } from "../../../actions/constants";

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = IMAGE_SIZE;

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileUpload = ({
    label,
    name,
    maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
    ...otherProps
}) => {
    const fileInputField = useRef(null);
    // const [files, setFiles] = useState({});
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);

    const handleUploadBtnClick = () => {
        fileInputField.current.click();
    };



    const addNewFiles = (newFiles) => {
        for (let file of newFiles) {
            if (file.size <= maxFileSizeInBytes) {
                if (!otherProps.multiple) {
                    return { file };
                }
                field.value[file.name] = file;
            }
        }
        return { ...field.value };
    };

    React.useEffect(() => {
        if (field.value && typeof field.value.name == 'string') {
            let updatedFiles = addNewFiles([field.value]);
            setFieldValue(name, updatedFiles);
        }
    }, [field.value])


    const handleNewFileUpload = (e) => {
        const { files: newFiles } = e.target;
        if (newFiles.length) {
            let updatedFiles = addNewFiles(newFiles);
            //console.log("file name", name);
            setFieldValue(name, updatedFiles);
        }
    };

    

    const removeFile = (fileName) => {
        delete field.value[fileName];
        setFieldValue(name, { ...field.value });
    };

    return (
        <>
            <Typography variant="body2" color="textSecondary" marginTop="10px">
                {label}
            </Typography>
            <div className="row mb-2">
                <div className="col-md-12">
                    <FileUploadContainer>
                        <DragDropText>Drag and drop your files anywhere or</DragDropText>
                        <UploadFileBtn type="button" onClick={handleUploadBtnClick} disabled={otherProps.disabled}>
                            <i className="fas fa-file-upload" />
                            <span> Upload {otherProps.multiple ? "files" : "a file"}</span>
                        </UploadFileBtn>
                        <FormField
                            type="file"
                            ref={fileInputField}
                            onChange={handleNewFileUpload}
                            title=""
                            value=""
                            {...otherProps}
                        />
                    </FileUploadContainer>
                </div>
                <div className="col-md-12">
                    <FilePreviewContainer>
                        {/* <span>To Upload</span> */}
                        
                        <PreviewList>
                            {Object.keys(field.value).map((fileName, index) => {
                                let file = field.value[fileName];
                                let isImageFile = file?.type?.split("/")[0] === "image";
                                let isVideoFile = file?.type?.split("/")[0] === "video";
                                return (
                                    <PreviewContainer key={fileName}>
                                        <div>
                                            {isImageFile && (
                                                <ImagePreview
                                                    src={URL.createObjectURL(file)}
                                                    alt={`file preview ${index}`}
                                                />
                                            )}
                                            {isVideoFile && (
                                                <VideoPreview
                                                    alt={`file preview ${index}`}
                                                    autoplay muted
                                                >
                                                    <source src={URL.createObjectURL(file)} type={file?.type}></source>
                                                </VideoPreview>
                                            )}
                                            <FileMetaData isImageFile={isImageFile} isVideoFile={isVideoFile}>
                                                <span>{(((file.name).substring(0, 30)) + (file.name.length > 30 ? '...' : ''))}</span>
                                                <aside>
                                                    <span>{convertBytesToKB(file.size)} kb</span>
                                                    <RemoveFileIcon
                                                        className="fas fa-trash-alt"
                                                        onClick={() => removeFile(fileName)}
                                                    />
                                                </aside>
                                            </FileMetaData>
                                        </div>
                                    </PreviewContainer>
                                );
                            })}
                        </PreviewList>
                    </FilePreviewContainer>
                </div>
                <div className="col-md-12">
                    {meta && meta.error ? <Typography variant="caption" color='error'>{meta.error}</Typography> : null}
                </div>
            </div>
        </>
    );
};

export default FileUpload;