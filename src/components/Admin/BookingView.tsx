import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { TBookingResponse } from "../../types/bookingTypes";
import {
  CheckCircle,
  Calendar,
  Mail,
  Phone,
  User,
  UsersRound,
  IndianRupee,
} from "lucide-react";
import { format } from "date-fns";

const BookingView: React.FC = () => {
  const [booking, setBooking] = useState<TBookingResponse>();
  const location = useLocation();
  const data = location.state;
  useEffect(() => {
    setBooking(data);
  }, [data]);

  return (
    <>
      {!booking ? (
        <p className="text-center text-gray-600 mt-10 text-lg font-semibold">
          No Booking Data Available!
        </p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 mb-10 shadow-xl border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              {booking?.packageId.name}
            </h2>
            <span
              className={`text-sm font-semibold px-4 py-1 rounded-full shadow-md 
          ${
            booking.tripStatus === "Completed"
              ? "bg-green-200 text-green-800"
              : booking.tripStatus === "Pending"
              ? "bg-yellow-200 text-yellow-800"
              : "bg-gray-200 text-gray-700"
          }`}
            >
              {booking.tripStatus}
            </span>
          </div>

          <div className="w-full h-72 rounded-2xl overflow-hidden mb-6 shadow-lg">
            <img
              src={
                data?.packages.images[0] ||
                "https://via.placeholder.com/600x400"
              }
              alt="Package"
              className="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-105"
            />
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {data?.packages.name}
            </h3>
            <hr className="my-4" />
          </div>

          <div className="space-y-3 text-gray-700 text-sm">
            <p className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              <strong>Customer:</strong>{" "}
              <span className="ml-1">{booking.userId}</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <strong>Email:</strong>{" "}
              <span className="ml-1">{booking.email}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <strong>Phone:</strong>{" "}
              <span className="ml-1">{booking.phone}</span>
            </p>

            <hr className="my-4" />
            <p className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-gray-500" />
              <strong>Booking ID:</strong>{" "}
              <span className="ml-1">{booking._id}</span>
            </p>
            <p className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <strong>Booking Date:</strong>{" "}
              <span className="ml-1">
                {format(new Date(booking.bookingDate), "dd-MM-yyyy")}
              </span>
            </p>

            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <strong>Total Guests:</strong>{" "}
              <span className="ml-1">{booking.totalGuest}</span>
            </p>

            <div className="mt-4 bg-gray-50 p-4 rounded-xl border">
              <p className="flex items-center gap-2 mb-2">
                <UsersRound className="w-5 h-5 text-gray-600" />
                <strong className="text-gray-800">Travellers:</strong>
              </p>
              <div className="flex gap-4 flex-wrap ml-6 text-gray-600 text-sm">
                <p className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <strong>Adult:</strong> {booking.travellers.adult}
                </p>
                <p className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <strong>Children:</strong> {booking.travellers.children}
                </p>
                <p className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <strong>Infant:</strong> {booking.travellers.infant}
                </p>
              </div>
            </div>
            <p className="flex items-center gap-2 mt-4">
              <Calendar className="w-4 h-4 text-gray-500" />
              <strong>Travel Date:</strong>{" "}
              <span className="ml-1">
                {new Date(booking.tripDate).toLocaleDateString("en-IN")}
              </span>
            </p>
            <p className="flex items-center gap-2 text-lg font-semibold text-teal-950 mt-2">
              <IndianRupee className="w-4 h-4 text-gray-500" size={20} />
              Total Amount: ₹{booking.totalAmount}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingView;
