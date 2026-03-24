import React, { useState, useContext, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Select from 'react-select'
import { BsStars } from 'react-icons/bs'
import { HiOutlineCode } from 'react-icons/hi'
import Editor from '@monaco-editor/react';
import { IoCopy, IoCloseSharp } from 'react-icons/io5'
import { PiExportBold } from 'react-icons/pi'
import { ImNewTab } from 'react-icons/im'
import { FiRefreshCcw } from 'react-icons/fi'
import { GoogleGenAI } from "@google/genai";
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { ThemeContext } from '../context/ThemeContext'

function Home() {
    const { theme } = useContext(ThemeContext);

    const options = [
        { value: 'html-css', label: 'HTML + CSS' },
        { value: 'html-tailwind', label: 'HTML + Tailwind CSS' },
        { value: 'html-bootstrap', label: 'HTML + Bootstrap' },
        { value: 'html-css-js', label: 'HTML + CSS + JS' },
        { value: 'html-tailwind-bootstrap', label: 'HTML + Tailwind + Bootstrap' },
        { value: 'react', label: 'React (JSX)' },
        { value: 'react-tailwind', label: 'React + Tailwind CSS' },
        { value: 'react-bootstrap', label: 'React + Bootstrap' },
        { value: 'nextjs', label: 'Next.js + Tailwind' },
        { value: 'vue', label: 'Vue.js' },
        { value: 'vue-tailwind', label: 'Vue + Tailwind CSS' },
        { value: 'angular', label: 'Angular' },
        { value: 'material-ui', label: 'React + Material UI' },
        { value: 'chakra-ui', label: 'React + Chakra UI' },
        { value: 'shadcn-ui', label: 'React + shadcn/ui' },
        { value: 'scss', label: 'HTML + SCSS' },
        { value: 'styled-components', label: 'React + Styled Components' },
        { value: 'responsive-only', label: 'Pure Responsive HTML (No Framework)' },
        { value: 'animation-ui', label: 'UI with Animations (CSS/JS)' },
    ];
    
    const [outputScreen, setOutputScreen] = useState(false);
    const [tab, setTab] = useState(1);
    const [prompt, setPrompt] = useState("");
    const [frameWork, setFrameWork] = useState(options[0].value);
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [isNewTabOpen, setIsNewTabOpen] = useState(false);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        const saved = localStorage.getItem("lastCode");
        if (saved) {
            setCode(saved);
            setOutputScreen(true); 
        }
    }, []);

    function extractCode(response) {
        const match = response.match(/```(?:\w+)?\n([\s\S]*?)```/);
        return match ? match[1].trim() : response.trim();
    }

    const ai = new GoogleGenAI({
        apiKey: import.meta.env.VITE_GEMINI_API_KEY
    });

    const getLanguage = () => {
        if (frameWork.includes("react") || frameWork.includes("next")) return "javascript";
        if (frameWork.includes("vue")) return "javascript";
        if (frameWork.includes("angular")) return "typescript";
        return "html";
    };

    const canPreview = () => {
        return frameWork.includes("html") || frameWork.includes("css");
    };

    async function getResponse() {
        setLoading(true);
        try{
            const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `
            You are an experienced programmer with expertise in web development and UI/UX design. You create modern, animated, and fully responsive UI components. You are highly skilled in HTML, CSS, Tailwind CSS, Bootstrap, JavaScript, React, Next.js, Vue.js, Angular, and more.
            
            Now, generate a UI component for: ${prompt}  
            Framework to use: ${frameWork}  
            
            Requirements:  
            - The code must be clean, well-structured, and easy to understand.  
            - Optimize for SEO where applicable.  
            - Focus on creating a modern, animated, and responsive UI design.  
            - Include high-quality hover effects, shadows, animations, colors, and typography.  
            - Return ONLY the code, formatted properly in **Markdown fenced code blocks**.  
            - Do NOT include explanations, text, comments, or anything else besides the code.  
            

            Rules:
            - If framework is HTML → return full HTML file
            - If React/Next → return JSX component
            - If Vue → return Vue component
            - If Angular → return TypeScript component
            - Use best practices of the selected framework
            - Use clean structure and modern UI design
            - Add animations, shadows, hover effects
            - Make it responsive

            Output:
            - ONLY return code
            - Wrap in markdown code block
            - NO explanation
            `,
        });
        //console.log(response.text);

        const extracted = extractCode(response.text);
        
        setCode(extracted);
        localStorage.setItem("lastCode", extracted); 
        setOutputScreen(true);
        //localStorage.removeItem("lastCode");
        }catch (err) {
            console.error(err);
            toast.error("Failed to generate code");
        }
        setLoading(false);
    }

    const copyCode = async() => {
        if (!code.trim()) return toast.error("No code to copy");
        try {
            await navigator.clipboard.writeText(code);
            toast.success("Code copied to clipboard");
        } catch (err) {
            console.error('Failed to copy: ', err);
            toast.error("Failed to copy code");
        }
    }

    const downloadFile = () => {
        if (!code.trim()) {
            return toast.error("No code to download");
        }

        // HTML file
        const htmlBlob = new Blob([code], { type: "text/html" });
        const htmlUrl = URL.createObjectURL(htmlBlob);

        const htmlLink = document.createElement("a");
        htmlLink.href = htmlUrl;
        htmlLink.download = "GenUI-Code.html";
        htmlLink.click();

        // TXT file
        const txtBlob = new Blob([code], { type: "text/plain" });
        const txtUrl = URL.createObjectURL(txtBlob);

        const txtLink = document.createElement("a");
        txtLink.href = txtUrl;
        txtLink.download = "GenUI-Code.txt";
        txtLink.click();

        URL.revokeObjectURL(htmlUrl);
        URL.revokeObjectURL(txtUrl);

        toast.success("Files downloaded");
    };


  return (
    <>
      <Navbar />
      <div className='flex items-center px-[100px] justify-between gap-[20px]'>
        {/* <div className='left w-[70%] h-auto py-[30px] rounded-xl bg-[#141319] mt-5 px-[20px]'> */}
        <div className='left w-[70%] h-auto py-[30px] rounded-xl 
        bg-white dark:bg-[#141319] text-black dark:text-white 
        border border-gray-400 dark:border-transparent mt-5 px-[20px]'>
            <h3 className='text-[25px] font-semibold sp-text'> AI component generator</h3>
            <p className='text-[gray] mt-2 text-[16px]'>Describe your component in your language and let AI generate the code for you.</p>

            <p className='text-[15px] font-[700] mt-4'>Framework</p>
            <Select 
                className='mt-2'
                    options={options}
                      styles={{
                          control: (base, state) => ({
                              ...base,
                              backgroundColor: theme === "dark" ? "#0f0f0f" : "#ffffff",
                              borderColor: state.isFocused
                                  ? "#a855f7"
                                  : (theme === "dark" ? "#333" : "#ccc"),
                              boxShadow: "none",
                              borderRadius: "10px",
                              padding: "2px",
                              color: theme === "dark" ? "#fff" : "#000",
                              "&:hover": {
                                  borderColor: "#a855f7",
                              },
                          }),

                          menu: (base) => ({
                              ...base,
                              backgroundColor: theme === "dark" ? "#0f0f0f" : "#ffffff",
                              border: `1px solid ${theme === "dark" ? "#333" : "#ccc"}`,
                              borderRadius: "10px",
                              overflow: "hidden",
                          }),

                          option: (base, state) => ({
                              ...base,
                              backgroundColor: state.isSelected
                                  ? "#a855f7"
                                  : state.isFocused
                                      ? (theme === "dark" ? "#1a1a1a" : "#f3f4f6")
                                      : (theme === "dark" ? "#0f0f0f" : "#ffffff"),
                              color: state.isSelected
                                  ? "#fff"
                                  : (theme === "dark" ? "#ccc" : "#000"),
                              cursor: "pointer",
                          }),

                          singleValue: (base) => ({
                              ...base,
                              color: theme === "dark" ? "#fff" : "#000",
                          }),

                          input: (base) => ({
                              ...base,
                              color: theme === "dark" ? "#fff" : "#000",
                          }),

                          placeholder: (base) => ({
                              ...base,
                              color: theme === "dark" ? "#888" : "#666",
                          }),

                          dropdownIndicator: (base) => ({
                              ...base,
                              color: theme === "dark" ? "#aaa" : "#555",
                              "&:hover": {
                                  color: theme === "dark" ? "#fff" : "#000",
                              },
                    }),

                    indicatorSeparator: () => ({
                        display: "none",
                    }),
                }}

                onChange={(e) => setFrameWork(e.value)}
            />

            <p className='text-[15px] font-[700] mt-5'>Describe your component</p>
            {/* <textarea onChange={(e)=>{setPrompt(e.target.value)}} value={prompt} className='w-full min-h-[200px] rounded-lg bg-[#09090B] mt-3 p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500 resize-none' */}
            <textarea onChange={(e)=>{setPrompt(e.target.value)}} value={prompt} className='w-full min-h-[200px] rounded-lg mt-3 p-3 bg-gray-100 dark:bg-[#09090B] text-black dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500 resize-none'
             placeholder="Describe your component in detail and AI will generate it..."
            ></textarea>

            <div className="flex items-center justify-between mt-3">
                <p className='text-gray-400 text-sm'>Click on generate button to get your code</p>
                <button disabled={loading} onClick={getResponse} className="generate flex items-center p-3 rounded-lg border-0 bg-gradient-to-r from-purple-400 to-purple-600 mt-3 px-[20px] gap-[10px] transition-all hover:opacity-80 hover:scale-105 active:scale-95">
                {
                    loading===false ?
                    <>
                     <i><BsStars /></i>
                    </> : ""
                }
                {
                    loading === true ?
                    <>
                      <ClipLoader color='white' size={20} />
                    </> : ""
                }
                Generate</button>
            </div>
        </div>
        {/* <div className='right relative mt-2 w-full h-[100vh] bg-[#141319] rounded-xl overflow-hidden'> */}
        <div className='right relative mt-2 w-full h-[100vh] bg-white dark:bg-[#141319] 
        rounded-xl overflow-hidden border border-gray-400 dark:border-transparent 
        shadow-sm dark:shadow-none'>
            {
                outputScreen === false ? 
                <>
                <div className="skelton w-full h-full flex items-center flex-col justify-center">
                    <div className="circle p-[20px] flex items-center justify-center text-[30px] w-[70px] rounded-[50%] bg-gradient-to-r from-purple-400 to-purple-600"><HiOutlineCode /></div>
                    <p className='text-[16px] text-[gray] mt-3'>Your component & code will appear here</p>
                </div>
                </> : <>
                {/* <div className='top bg-[#17171C] w-full h-[60px] flex items-center gap-[15px] px-[20px]'> */}
                <div className='top bg-gray-100 dark:bg-[#17171C] w-full h-[60px] flex items-center gap-[15px] px-[20px]'>
                    <button onClick={() => {setTab(1)}} className={`btn w-[50%] p-[10px] rounded-xl cursor-pointer transition-all ${tab === 1 ? 'bg-[#333] text-white' : "bg-gray-200 text-black dark:bg-transparent dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-[#222]"}`}>Code</button>
                    <button onClick={() => {setTab(2)}} className={`btn w-[50%] p-[10px] rounded-xl cursor-pointer transition-all ${tab === 2 ? 'bg-[#333] text-white' : "bg-gray-200 text-black dark:bg-transparent dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-[#222]"}`}>Preview</button>
                </div>

                {/* <div className='top-2 bg-[#17171C] w-full h-[60px] flex items-center justify-between gap-[15px] px-[20px]'> */}
                <div className='top-2 bg-gray-100 dark:bg-[#17171C] w-full h-[60px] flex items-center justify-between gap-[15px] px-[20px]'>
                    <div className='left'>
                        <p className='font-bold text-black dark:text-white'>Code Editor</p>
                    </div>
                    <div className="right flex items-center gap-[10px]">
                        {
                            tab === 1 ?
                            <>
                             <button className="copy w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-800 flex items-center justify-center transition-all hover:bg-[#333]" onClick={copyCode}><IoCopy className="text-black hover:text-white dark:text-white" /></button>
                             <button className="export w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-800 flex items-center justify-center transition-all hover:bg-[#333]" onClick={downloadFile}><PiExportBold className="text-black hover:text-white dark:text-white" /></button>
                            </> :
                            <>
                             <button className="copy w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-800 flex items-center justify-center transition-all hover:bg-[#333]" onClick={() => {setIsNewTabOpen(true)}}><ImNewTab className="text-black hover:text-white dark:text-white" /></button>
                             <button className="export w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-800 flex items-center justify-center transition-all hover:bg-[#333]" onClick={() => setRefresh(prev=>prev+1)}><FiRefreshCcw className="text-black hover:text-white dark:text-white" /></button>
                            </>
                        }
                    </div>
                </div>
                <div className="editor h-full">
                    {
                    //    tab === 1 ?
                    //    <>
                    //      {/* <Editor value={code} height="100%" theme='vs-dark' language="html" /> */}
                    //      <Editor value={code} height="100%" theme={theme === "dark" ? "vs-dark" : "light"} language={getLanguage()} />
                    //    </> :
                    //    <>
                    //      <iframe srcDoc={code} className='preview w-full h-full bg-white text-black flex items-center justify-center' key={refresh}></iframe>
                    //    </>
                    tab === 1 ? (
                    <Editor 
                        value={code}
                        height="100%"
                        theme={theme === "dark" ? "vs-dark" : "light"}
                        language={getLanguage()}
                    />
                    ) : (
                    canPreview() ? (
                        <iframe
                            srcDoc={code}
                            className='w-full h-full bg-white'
                            key={refresh}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 text-center px-4">
                            🚫 Preview not supported for this framework <br />
                            (React / Vue / Angular require build tools)
                        </div>
                        )
                    )
                    }
                    
                </div>
                </>
            }
        </div>
      </div>

      {
        isNewTabOpen === true ?
        <>
        <div className="container absolute left-0 top-0 right-0 bottom-0 bg-white w-screen min-h-screen overflow-auto">
            <div className="top text-black w-full h-[60px] flex items-center justify-between px-[20px]">
                <div className="left">
                    <p className='font-bold'>Preview</p>
                </div>
                <div className="right flex items-center gap-[10px]">
                    <button className="copy w-[40px] h-[40px] rounded-xl border-[1px] border-zinc-800 flex items-center justify-center transition-all hover:bg-[#333]" onClick={() => {setIsNewTabOpen(false)}}><IoCloseSharp /></button>
                </div>
            </div>
            <iframe srcDoc={code} className='w-full h-full'></iframe>
        </div>
        </> : ""
      }
    </>
  )
}

export default Home
