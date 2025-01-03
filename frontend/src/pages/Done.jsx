import { useNavigate } from "react-router-dom";

export const Done = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center text-green-600">
              Transfer Successful
            </h2>
            <p className="text-center text-lg text-gray-700">
              Your money has been successfully transferred!
            </p>
          </div>
          <div className="p-6 text-center">
            <button
              onClick={() => navigate("/dashboard")} // Redirect to home or another page
              className="bg-blue-500 text-white rounded-md px-6 py-2 mt-4"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
