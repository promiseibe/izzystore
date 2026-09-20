"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createClient } from "@/utils/supabase/client";

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const supabase = createClient();

        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          toast.error("Please sign in to view your profile");
          return;
        }

        const { data, error } = await supabase
          .from("eldics_users")
          .select("id, email, full_name, avatar_url")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error(error);
          toast.error("Unable to load profile");
          return;
        }

        setProfile(data);
        setFullName(data.full_name || "");
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSave = async () => {
    if (!profile) return;

    if (!fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }

    try {
      setSaving(true);

      const supabase = createClient();

      const { data, error } = await supabase
        .from("eldics_users")
        .update({
          full_name: fullName.trim(),
        })
        .eq("id", profile.id)
        .select("id, email, full_name, avatar_url")
        .single();

      if (error) {
        console.error(error);
        toast.error("Failed to update profile");
        return;
      }

      setProfile(data);
      setFullName(data.full_name || "");
      setEditing(false);

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fafafa] px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-4xl animate-pulse">
          <div className="h-8 w-32 rounded-lg bg-gray-200" />

          <div className="mt-8 h-[400px] rounded-3xl bg-gray-200" />
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fafafa] px-4">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900">
            Profile unavailable
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Please sign in to view your profile.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa] px-4 py-8 sm:px-6 sm:py-12 lg:px-10">
      <div className="mx-auto w-full max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
            Account
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your personal information.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

          {/* Profile Header */}
          <div className="border-b border-gray-100 bg-gradient-to-br from-orange-50 via-white to-white px-5 py-8 sm:px-8">

            <div className="flex flex-col items-center gap-5 sm:flex-row">

              {/* Avatar */}
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-white bg-orange-100 shadow-md sm:h-28 sm:w-28">

                {profile.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt={profile.full_name || "Profile"}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-orange-500">
                    {profile.full_name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}

              </div>

              {/* User Info */}
              <div className="text-center sm:text-left">

                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {profile.full_name || "Your Name"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {profile.email}
                </p>

              </div>

            </div>
          </div>

          {/* Information */}
          <div className="px-5 py-7 sm:px-8 sm:py-9">

            <div className="mb-6 flex items-center justify-between gap-4">

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Personal Information
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Keep your information up to date.
                </p>
              </div>

              {!editing && (
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-orange-500 active:scale-95"
                >
                  Edit
                </button>
              )}

            </div>

            <div className="grid gap-5 sm:grid-cols-2">

              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>

                {editing ? (
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                  />
                ) : (
                  <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-700">
                    {profile.full_name || "Not provided"}
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>

                <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-500">
                  {profile.email}
                </div>
              </div>

            </div>

            {/* Save / Cancel */}
            {editing && (
              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  disabled={saving}
                  onClick={() => {
                    setEditing(false);
                    setFullName(profile.full_name || "");
                  }}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={saving}
                  onClick={handleSave}
                  className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>

              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}