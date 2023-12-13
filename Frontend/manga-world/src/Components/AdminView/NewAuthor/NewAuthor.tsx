import React, { useRef, useState } from "react";
import AuthorController from "../../../Controller/AuthorController";
function NewAuthor() {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState<string | null>(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    validateInputs();
  };

  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebsite(e.target.value);
    validateInputs();
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPicture(null); // Clear previous picture data
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateInputs = () => {
    setIsSubmitDisabled(!name || !website || !description);
  };

  const handleSubmit = () => {
    let tempAuthor = {
      aname: name,
      awebsite: website,
      adescription: description,
    };
    AuthorController.addNewAuthor(tempAuthor).then((res) => {
      if (picture) {
        let tempAuthor = {
          author: res.data,
          apPicture: picture,
        };
        AuthorController.addAuthorPicture(tempAuthor).then((res) => {
          setSuccessMessage("Category added successfully!");
          setName("");
          setWebsite("");
          setDescription("");
          setPicture(null);
          setIsSubmitDisabled(true);
          if (fileInputRef.current) {
            (fileInputRef.current as any).value = "";
          }
          setTimeout(() => setSuccessMessage(""), 5000);
        });
      } else {
        setSuccessMessage("Category added successfully!");
        setName("");
        setWebsite("");
        setDescription("");
        setPicture(null);
        setIsSubmitDisabled(true);
        if (fileInputRef.current) {
          (fileInputRef.current as any).value = "";
        }
        setTimeout(() => setSuccessMessage(""), 5000);
      }
    });
  };
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
    validateInputs();
  };

  return (
    <div className="w-1/3 mt-8 p-6 bg-black bg-opacity-50 rounded">
      <h2 className="text-xl font-semibold mb-4 text-white">Add New Mangaka</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Website"
          className="w-full p-2 border rounded"
          value={website}
          onChange={handleWebsiteChange}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-white text-sm font-medium"
        >
          Description
        </label>
        <textarea
          id="description"
          placeholder="Description"
          className="w-full p-2 border rounded resize-none"
          value={description}
          onChange={handleDescriptionChange}
          rows={10}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="picture"
          className="block text-white text-sm font-medium"
        >
          Picture
        </label>
        <input
          type="file"
          id="picture"
          accept="image/*"
          onChange={handlePictureChange}
          className="block mt-1 w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          ref={fileInputRef}
        />
      </div>
      {picture && (
        <div className="mb-4">
          <img
            src={picture}
            alt="Selected"
            className="w-full border-2 border-white rounded-xl"
          />
        </div>
      )}
      <button
        className={`w-full p-2 bg-blue-500 text-white rounded ${
          isSubmitDisabled && "opacity-50 cursor-not-allowed"
        }`}
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
      >
        Submit
      </button>
      {successMessage && (
        <div className="mt-4 text-green-500">{successMessage}</div>
      )}
    </div>
  );
}

export default NewAuthor;
