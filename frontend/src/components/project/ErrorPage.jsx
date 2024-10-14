import { Button } from "@/components/ui/button";

export default function Error401() {
    
  const handleGoBack = () => {
    history.back(); 
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold text-red-500">401</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Unauthorized Access
        </h2>
        <p className="mt-2 text-gray-600">
          Sorry, you do not have permission to access this page.
        </p>

        <Button onClick={handleGoBack} className="mt-6">
          Go Back
        </Button>
      </div>
    </div>
  );
}
