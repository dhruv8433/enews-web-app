import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { ErrorProps } from "../types/error.types";

const ErrorComponent: React.FC<ErrorProps> = ({ error }) => {
    if (!error) return null;

    return (
        <div className="flex justify-center items-center p-4 h-full">
            <div className="max-w-md w-full">
                <Alert severity="error" className="shadow-lg rounded-lg">
                    <div className="flex items-start gap-2">
                        <div>
                            <AlertTitle className="font-bold">Error</AlertTitle>
                            <p>{error.message}</p>
                            {error.details && (
                                <p className="text-sm opacity-80 mt-1">{error.details}</p>
                            )}
                        </div>
                    </div>
                </Alert>
            </div>
        </div>
    );
};

export default ErrorComponent;
