"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ListBox = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  async function handleSubmit() {
    // fetch API POST
    try {
      const apiResponse = await fetch("/api/list", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const result = await apiResponse.json();
      if (result?.success) {
        router.refresh();
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div>
      <form
        className="flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <label htmlFor="title">Title</label>
        <input
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          value={formData.title}
          type="text"
          name="title"
          className="text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
        />
        <label htmlFor="description">Description</label>
        <textarea
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          value={formData.description}
          type="text"
          name="description"
          className="h-24 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
        />
        <button
          type="submit"
          className="px-6 my-4 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-gray-900 border-gray-600 placeholder-gray-400 text-white"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default ListBox;
