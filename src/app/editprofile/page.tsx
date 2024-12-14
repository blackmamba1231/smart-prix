"use client"
import React, { useState } from "react";
import { CameraIcon } from "@heroicons/react/24/outline";

const ProfileEdit: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState<string>("Jane Doe");
  const [phone, setPhone] = useState<string>("123-456-7890");
  const [bio, setBio] = useState<string>("Web developer passionate about creating amazing user experiences.");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setProfileImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Logic to save profile changes
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl w-full">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Edit Profile</h2>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              src={profileImage || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
            />
            <label
              htmlFor="profileImage"
              className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-400"
            >
              <CameraIcon className="h-6 w-6" />
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            ></textarea>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400 focus:ring-4 focus:ring-blue-300"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileEdit;