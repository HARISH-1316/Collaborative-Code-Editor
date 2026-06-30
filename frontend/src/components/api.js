import axios from "axios";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (language, sourceCode) => {
  try {
    let response = await API.get("/runtimes");

    const runtime = response.data.find((item) => item.language === language);

    console.log(runtime);

    response = await API.post("/execute", {
      language,
      version: runtime.version,
      files: [
        {
          content: sourceCode,
        },
      ],
    });

    return response.data;
  } catch (err) {
    console.log(err.response?.status);
    console.log(err.response?.data);
    throw err;
  }
};
