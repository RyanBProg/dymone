"use client";

import { useEffect, useState } from "react";
import { getSanityUser } from "@/actions/user/userActions";
import { redirect } from "next/navigation";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { userDetailsSchema } from "@/zod/userDetailsSchema";
import { toast } from "react-hot-toast";
import { updateUserDetails } from "@/actions/user/userActions";

export default function AccountPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sanityUser, setSanityUser] = useState<Awaited<
    ReturnType<typeof getSanityUser>
  > | null>(null);

  const fetchSanityUser = async () => {
    try {
      const userData = await getSanityUser();
      setSanityUser(userData);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSanityUser();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!sanityUser?.success || !sanityUser.user) {
    redirect("/");
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      // Flatten the structure to match the schema
      const userData = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phoneNumber: formData.get("phoneNumber") as string,
        street: formData.get("street") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        postcode: formData.get("postcode") as string,
        country: formData.get("country") as string,
      };

      const result = userDetailsSchema.safeParse(userData);
      if (!result.success) {
        console.log("Validation errors:", result.error.errors);
        toast.error(result.error.errors[0].message, {
          position: "top-center",
          style: { backgroundColor: "#F8B4B4" },
        });
        setIsLoading(false);
        return;
      }

      // Update user details
      const updateResult = await updateUserDetails(result.data);

      if (updateResult.success) {
        toast.success("Profile updated successfully");
        await fetchSanityUser(); // Refresh user data
        setIsEditing(false);
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating your profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-neutral-100 my-20 md:my-44 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="tracking-tighter font-extrabold text-[3rem] sm:text-[4rem]">
            My Account
          </h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-purple-100 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors"
            disabled={isLoading}>
            {isEditing ? "Cancel" : "Edit Details"}
          </button>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Details Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-medium mb-4">Personal Details</h2>

              <div>
                <label className="block text-sm mb-1">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    defaultValue={sanityUser.user.name}
                    className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
                  />
                ) : (
                  <p className="p-2">{sanityUser.user.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm mb-1">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    defaultValue={sanityUser.user.email}
                    className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
                  />
                ) : (
                  <p className="p-2">{sanityUser.user.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm mb-1">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phoneNumber"
                    defaultValue={sanityUser.user.phoneNumber}
                    className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
                  />
                ) : (
                  <p className="p-2">
                    {sanityUser.user.phoneNumber || "Not provided"}
                  </p>
                )}
              </div>
            </div>

            {/* Address Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-medium mb-4">Address</h2>

              <div>
                <label className="block text-sm mb-1">Street</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="street"
                    defaultValue={sanityUser.user.address?.street}
                    className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
                  />
                ) : (
                  <p className="p-2">
                    {sanityUser.user.address?.street || "Not provided"}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">City</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="city"
                      defaultValue={sanityUser.user.address?.city}
                      className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
                    />
                  ) : (
                    <p className="p-2">
                      {sanityUser.user.address?.city || "Not provided"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-1">State</label>
                  {isEditing ? (
                    <select
                      className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
                      name="state"
                      id="state"
                      defaultValue={sanityUser.user.address?.state}>
                      <option value="ACT">ACT</option>
                      <option value="NSW">NSW</option>
                      <option value="NT">NT</option>
                      <option value="QLD">QLD</option>
                      <option value="SA">SA</option>
                      <option value="VIC">VIC</option>
                      <option value="WA">WA</option>
                    </select>
                  ) : (
                    <p className="p-2">
                      {sanityUser.user.address?.state || "Not provided"}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Postcode</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="postcode"
                      defaultValue={sanityUser.user.address?.zipCode}
                      className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
                    />
                  ) : (
                    <p className="p-2">
                      {sanityUser.user.address?.zipCode || "Not provided"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-1">Country</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="country"
                      defaultValue={
                        sanityUser.user.address?.country || "Australia"
                      }
                      className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
                    />
                  ) : (
                    <p className="p-2">
                      {sanityUser.user.address?.country || "Not provided"}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {isEditing && (
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading ? <LoadingSpinner size="sm" /> : "Save Changes"}
              </button>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
