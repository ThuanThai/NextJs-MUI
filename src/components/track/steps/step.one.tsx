import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import './style.scss'
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useSession } from 'next-auth/react';
import { sendRequestFile } from '@/utils/api';
import axios from 'axios';
import { TrackUpload } from '../tab.track';


interface IProps {
    setValue: (value: number) => void,
    trackUpload: TrackUpload
    setTrackUpload: Dispatch<SetStateAction<TrackUpload>>
}

const StepOne = (props: IProps) => {
    const { setValue, setTrackUpload, trackUpload } = props
    const { data: session } = useSession();
    const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
        if (acceptedFiles && acceptedFiles[0]) {
            setValue(1)
            const audio = acceptedFiles[0]
            const formData = new FormData()
            formData.append("fileUpload", audio)

            const config = {
                headers: {
                    'target_type': "tracks",
                    'Authorization': `Bearer ${session?.access_token}`,
                    delay: 3000
                },
                onUploadProgress: (progressEvent: any) => {
                    let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);

                    setTrackUpload({ ...trackUpload, fileName: acceptedFiles[0].name, percent: percentCompleted })
                }
            }
            try {
                const res = await axios.post("http://localhost:8000/api/v1/files/upload", formData, config)

                setTrackUpload((prevState: TrackUpload) => ({
                    ...prevState,
                    uploadedTrackName: res.data.data.fileName
                }))

            } catch (error) {
                //@ts-ignore
                console.log("error", error?.response?.data)
            }
        }
    }, [session])


    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop, accept: { "audio/mp3": [".mp3"] } });

    const files = acceptedFiles.map((file: FileWithPath) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>

                <input {...getInputProps()} />
                <Button
                    sx={{ marginBottom: 1, backgroundColor: "orangered" }}

                    onClick={(e) => e.preventDefault()}
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    Upload file
                </Button>
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
            </aside>
        </section>
    );
};

export default StepOne;