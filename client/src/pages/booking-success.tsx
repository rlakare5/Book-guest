import Header from "@/components/header";
import { CheckCircle } from "lucide-react";

export default function BookingSuccess() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="booking-form-container">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Booking Confirmed!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your guest list booking has been successfully created.
          </p>
          
          <div className="max-w-md mx-auto bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              What's Next?
            </h2>
            <ul className="text-left text-gray-600 space-y-2">
              <li>• You will receive a confirmation email shortly</li>
              <li>• Please arrive 15 minutes before your time slot</li>
              <li>• Bring a valid ID for verification</li>
              <li>• Contact us if you need to make any changes</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => window.location.href = "/"}
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Make Another Booking
            </button>
            
            <div className="text-gray-500 text-sm">
              <p>Need help? Contact us at support@restaurant.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}