import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertBookingSchema, type InsertBooking } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/header";
import { Info } from "lucide-react";
import { useState } from "react";

export default function Booking() {
  const { toast } = useToast();
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState<InsertBooking | null>(null);
  
  const form = useForm<InsertBooking>({
    resolver: zodResolver(insertBookingSchema),
    defaultValues: {
      city: "",
      state: "",
      male: 0,
      female: 0,
      children: 0,
      restaurant: "",
      timeSlot: "",
      name: "",
      mobile: "",
      email: "",
      bookingDate: "",
    },
  });

  const createBookingMutation = useMutation({
    mutationFn: async (data: InsertBooking) => {
      const response = await apiRequest("POST", "/api/bookings", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking Confirmed!",
        description: "Your guest list booking has been successfully created.",
      });
      form.reset();
      setShowConfirmation(false);
      // Redirect to success page
      window.location.href = "/booking-success";
    },
    onError: (error: any) => {
      toast({
        title: "Booking Failed",
        description: error.message || "There was an error creating your booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertBooking) => {
    setFormData(data);
    setShowConfirmation(true);
  };

  const confirmBooking = () => {
    if (formData) {
      createBookingMutation.mutate(formData);
    }
  };

  const states = [
    "Maharashtra", "Goa", "Tamilnadu", "Madhya Pradesh", "Gujarat", 
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka",
    "Kerala", "Manipur", "Mizoram"
  ];

  const generateTimeSlots = () => {
    const slots = [];
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Start from next hour if current time is past 30 minutes, otherwise from current hour + 1
    let startHour = currentMinute > 30 ? currentHour + 2 : currentHour + 1;
    
    // Generate time slots for the next 12 hours
    for (let i = 0; i < 12; i++) {
      const hour = (startHour + i) % 24;
      const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const period = hour < 12 ? 'AM' : 'PM';
      
      // 30-minute slots
      const slot1 = `${hour12}:00 ${period}`;
      const slot2 = `${hour12}:30 ${period}`;
      
      slots.push({ value: slot1, label: slot1 });
      slots.push({ value: slot2, label: slot2 });
    }
    
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="booking-form-container">
        <div className="booking-form-title">
          Book your Guest-List
        </div>
        
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="booking-rows">
            {/* Row 1: City, State, Male, Female */}
            <div className="booking-row">
              <div className="booking-field">
                <i className="fas fa-city booking-icon"></i>
                <input
                  {...form.register("city")}
                  type="text"
                  placeholder="City"
                  className="booking-input"
                />
              </div>

              <div className="booking-field">
                <i className="fas fa-location-dot booking-icon"></i>
                <input
                  {...form.register("state")}
                  type="text"
                  placeholder="State"
                  className="booking-input"
                />
              </div>

              <div className="booking-field">
                <i className="fas fa-children booking-icon"></i>
                <input
                  {...form.register("male", { valueAsNumber: true })}
                  type="number"
                  min="0"
                  placeholder="Male"
                  className="booking-input"
                />
              </div>

              <div className="booking-field">
                <i className="fas fa-person-dress booking-icon"></i>
                <input
                  {...form.register("female", { valueAsNumber: true })}
                  type="number"
                  min="0"
                  placeholder="Female"
                  className="booking-input"
                />
              </div>
            </div>

            {/* Row 2: Children, Restaurant, Time Slots */}
            <div className="booking-row">
              <div className="booking-field">
                <i className="fas fa-person booking-icon"></i>
                <input
                  {...form.register("children", { valueAsNumber: true })}
                  type="number"
                  min="0"
                  placeholder="Children"
                  className="booking-input"
                />
              </div>

              <div className="booking-field">
                <i className="fas fa-champagne-glasses booking-icon"></i>
                <input
                  {...form.register("restaurant")}
                  type="text"
                  placeholder="Restaurant"
                  className="booking-input"
                />
              </div>

              <div className="booking-field info-container">
                <i className="fas fa-location-dot booking-icon"></i>
                <select
                  {...form.register("timeSlot")}
                  className="booking-select"
                >
                  <option value="">Time Slots</option>
                  {timeSlots.map((slot) => (
                    <option key={slot.value} value={slot.value}>
                      {slot.label}
                    </option>
                  ))}
                </select>
                <button 
                  type="button"
                  className="info-icon"
                  onClick={() => setShowInfoPopup(!showInfoPopup)}
                >
                  <i className="fas fa-info-circle"></i>
                </button>
                <div className={`info-popup ${showInfoPopup ? 'visible' : ''}`}>
                  <p>Customers are kindly advised to provide time slots with a minimum of 30 minutes notice before visiting the restaurant. This allows us to ensure that your food is prepared and ready upon your arrival.</p>
                </div>
              </div>
            </div>

            {/* Row 3: Name, Mobile No., Email Id */}
            <div className="booking-row">
              <div className="booking-field">
                <i className="fas fa-person booking-icon"></i>
                <input
                  {...form.register("name")}
                  type="text"
                  placeholder="Name"
                  className="booking-input"
                  required
                />
              </div>

              <div className="booking-field">
                <i className="fas fa-phone booking-icon"></i>
                <input
                  {...form.register("mobile")}
                  type="tel"
                  placeholder="Mobile No."
                  className="booking-input"
                  required
                />
              </div>

              <div className="booking-field">
                <i className="fas fa-envelope booking-icon"></i>
                <input
                  {...form.register("email")}
                  type="email"
                  placeholder="Email Id"
                  className="booking-input"
                  required
                />
              </div>
            </div>

            {/* Row 4: Booking Date */}
            <div className="booking-date-container">
              <div className="booking-date-label">
                Booking Date
              </div>
              <input
                {...form.register("bookingDate")}
                type="date"
                className="booking-date-input"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={createBookingMutation.isPending}
                className="booking-submit-btn"
              >
                {createBookingMutation.isPending ? "BOOKING..." : "BOOK NOW"}
              </button>
            </div>

            {/* Error Messages */}
            {Object.keys(form.formState.errors).length > 0 && (
              <div className="w-full max-w-md mx-auto mt-4">
                {Object.entries(form.formState.errors).map(([field, error]) => (
                  <div key={field} className="error-message">
                    {error?.message}
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && formData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-96 overflow-y-auto">
            <h2 className="text-xl font-bold text-center mb-4 text-gray-800">
              Confirm Your Booking
            </h2>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">City:</span>
                <span className="text-gray-800">{formData.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">State:</span>
                <span className="text-gray-800">{formData.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Male:</span>
                <span className="text-gray-800">{formData.male}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Female:</span>
                <span className="text-gray-800">{formData.female}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Children:</span>
                <span className="text-gray-800">{formData.children}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Restaurant:</span>
                <span className="text-gray-800">{formData.restaurant}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Time Slot:</span>
                <span className="text-gray-800">{formData.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Name:</span>
                <span className="text-gray-800">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Mobile:</span>
                <span className="text-gray-800">{formData.mobile}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Email:</span>
                <span className="text-gray-800">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Booking Date:</span>
                <span className="text-gray-800">{formData.bookingDate}</span>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmBooking}
                disabled={createBookingMutation.isPending}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {createBookingMutation.isPending ? "Confirming..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
