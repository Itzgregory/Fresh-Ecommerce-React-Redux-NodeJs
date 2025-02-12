import { alertFromServerResponse } from '../index';

const handleError = (error, position) => {
    console.log("🔴 Full Error Object:", error);

    if (error.response) {
        const { status, data } = error.response;

        console.log("⚠️ Error Response:", error.response);
        console.log("📡 Status:", status);
        console.log("📝 Data:", data);

        if (!data || !data.message) {
            console.error("❌ Response data is missing or invalid:", data);
        }

        const message = data?.message || "An error occurred on the server.";
        const success = data?.success ?? false;

        if (!message) {
            console.error("❌ handleError is passing a null message to alertFromServerResponse!");
        }

        alertFromServerResponse(
            {
                statusCode: status || 500,
                success,
                message,
                data: data || null
            },
            position
        );
    } else if (error.request) {
        console.error("⚠️ Request made but no response received:", error.request);

        alertFromServerResponse(
            {
                statusCode: 500,
                success: false,
                message: "No response received from the server. Please try again later.",
                data: null
            },
            position
        );
    } else {
        console.error("🔴 Error setting up request:", error.message);

        alertFromServerResponse(
            {
                statusCode: 500,
                success: false,
                message: error.message || "An unknown error occurred! Please try again later.",
                data: null
            },
            position
        );
    }
};


export default handleError;
