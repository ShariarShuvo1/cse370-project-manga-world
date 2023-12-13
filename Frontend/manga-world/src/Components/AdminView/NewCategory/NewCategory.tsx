import React, { useState } from "react";
import Category from "../../../Model/Category";
import CategoryController from "../../../Controller/CategoryController";

function NewCategory() {
  const [name, setName] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    validateInputs();
  };

  const validateInputs = () => {
    setIsSubmitDisabled(!name);
  };

  const handleSubmit = () => {
    let tempCategory = {
      cname: name,
    };
    CategoryController.addNewCategory(tempCategory).then((res) => {
      if (res.data === true) {
        setSuccessMessage("Category added successfully!");
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        setErrorMessage("Category already exist!");
        setTimeout(() => setErrorMessage(""), 5000);
      }
      setName("");
      setIsSubmitDisabled(true);
    });
  };

  return (
    <div className="w-1/3 mt-8 p-6 bg-black bg-opacity-50 rounded">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Add New Category
      </h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded"
          value={name}
          onChange={handleNameChange}
        />
      </div>
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
        <div className={`mt-4 text-green-500`}>{successMessage}</div>
      )}
      {errorMessage && (
        <div className={`mt-4 text-red-500`}>{errorMessage}</div>
      )}
    </div>
  );
}

export default NewCategory;
