import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch("https://ai-img-generator-9r2s.onrender.com/api/v1/dalle/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please provide proper prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setIsLoading(true);
      try {
        const response = await fetch("https://ai-img-generator-9r2s.onrender.com/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        await response.json();
        alert("Success! Your image has been shared to the community!");
        navigate("/");
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please generate an image with proper details");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  return (
    <section className="max-w-7xl mx-auto">
      <div className="bg-blue-300 py-3 px-4 rounded">
      <div className="bg-blue-100 p-2 rounded">
        <h1 className="font-extrabold text-[#181616] text-[32px] bg-purple-400 px-3 rounded-md text-center">Generate images</h1>
        <p className="mt-2 text-[#0e1612]  text-center text-[16px] max-w-[100%] bg-[#36ffa8] py-1 rounded-md ">Generate an imaginative image through DALL-E AI and share it with the community</p>
      </div>

      {/* to set items on center .... add flex properties before adding justify-center */}
      <div className="bg-green-100 rounded flex justify-center mt-1 "> 
      <form className="my-4 max-w-3xl bg-[#a7f1cfef] p-3 rounded" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Enter your name"
            type="text"
            name="name"
            placeholder="Ex... John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A Space Shuttle flying above Cape Town, digital art..."
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
            
          />

          <div className="relative xs:w-[300px] bg-green-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40 "
              />
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-[#192721] bg-[#36ffa8] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center border-2 border-[#fafcfc]  hover:bg-blue-400 hover:text-white"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>

        <div className="mt-10 text-end">
        <p className="mt-2 text-[#121213] text-[15px]">Once you have created the image you want, you can share it with others in the community</p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#23b1d4] border-2 border-white font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 hover:bg-green-400 hover:text-black"
          >
            {isLoading ? "Sharing..." : "Share with the Community"}
          </button>
        </div>
      </form>
      </div>
      </div>
    </section>
  );
};

export default CreatePost;