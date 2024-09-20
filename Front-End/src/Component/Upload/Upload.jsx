import { useState } from 'react';
import logoUpload from '../../Assets/8725982_image_upload_icon.png';
import './upload.css';
import axios from 'axios';

export default function Upload() {
    const [image, setImage] = useState(null);
    const [result, setResult] = useState(null);
    const [resultTxt, setResultTxt] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    async function sendImageToAi(e) {
        e.preventDefault();
        console.log(image);
        let body = new FormData();
        body.append("image", image);
        // process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
        try {
     let  responseData= await fetch(`http://ec2-3-17-244-197.us-east-2.compute.amazonaws.com:5000/predict`, {
                method: 'POST',
                body,
                headers: {
                    'Accept': 'application/json',
                },
                // mode: 'cors',
                
            }).then(response => response.json())
            
            setResult(responseData["predicted_classes"][0]);
            if (responseData["predicted_classes"][0] === "mouth_ulcer") {
                setResultTxt("Mouth ulcers, or canker sores, are painful lesions that form on the mucous membranes inside the mouth. They can be caused by factors like stress, injury, or vitamin deficiencies. While typically resolving on their own within a week or two, avoiding spicy foods and using topical treatments can help alleviate discomfort.");
            } else if (responseData["predicted_classes"][0] === "tooth_discoloration") {
                setResultTxt("Tooth discoloration, often caused by factors like coffee, tea, or smoking, can detract from a confident smile. Regular dental cleanings, whitening treatments, and avoiding stain-causing habits can help maintain a bright, healthy smile. Consulting a dentist can provide personalized solutions for combating tooth discoloration and restoring dental aesthetics.");
            } else if (responseData["predicted_classes"][0] === "hypodontia") {
                setResultTxt("Hypodontia, characterized by missing teeth, poses challenges in oral health. It can impact aesthetics, function, and self-esteem. Early detection through dental exams is crucial for effective management. Treatment options may include orthodontic intervention, dental implants, or prosthetic solutions. Regular dental care is essential for individuals with hypodontia");
            } else if (responseData["predicted_classes"][0] === "caries") {
                setResultTxt("Caries, commonly known as tooth decay, is a prevalent dental issue caused by plaque bacteria breaking down sugars in the mouth. This process produces acids that erode tooth enamel, leading to cavities. Prevention involves regular brushing, flossing, and dental check-ups to detect and treat caries early, preserving oral health.");
            } else if (responseData["predicted_classes"][0] === "gingivitis") {
                setResultTxt("Gingivitis, marked by inflamed gums, is often the first stage of gum disease. Caused by plaque buildup, it's preventable with good oral hygiene. Regular brushing, flossing, and dental check-ups are crucial. Left untreated, gingivitis can progress to more severe gum disease. Take action early for a healthy smile!");
            } else if (responseData["predicted_classes"][0] === "calculus") {
                setResultTxt("Calculus, a hardened plaque, poses serious threats to oral health. Formed by mineral deposits from saliva, it adheres to teeth and gum lines, leading to gum disease and decay. Regular brushing and flossing are vital for prevention. Professional cleanings are necessary to remove stubborn calculus, ensuring a healthy smile.");
            } 
        } catch (err) {
            console.log("err", err);
        }
    }
    async function send (e){
e.preventDefault();
let body = new FormData();
body.append("image", image);
fetch(`http://3.17.244.197:5000/predict`,{
    method: 'POST',
body
}).then(response => response.json()).then(res => console.log(res))
    }



    function handleFileSelect(event) {
        const selectedFile = event.target.files[0];
        setImage(selectedFile); // Set the selected file to state
        setPreviewImage(URL.createObjectURL(selectedFile)); // Create a preview image URL
    }
    return (
        <section className="pageUpload">
            <div className="container d-flex justify-content-between flex-wrap my-5">
                <div className="upload col-md-6 col-12">
                    <div className="cardimageUpload">
                        <form action="" onSubmit={sendImageToAi}>
                            <label htmlFor="imageUpload"><img className='w-50' src={previewImage ? previewImage : logoUpload} alt="" /></label>
                            <input type="file" onChange={handleFileSelect} id='imageUpload' alt="" accept='.png ,.jpg, .jpeg,.svg,.webp' />
                            <button type='submit' className='btn btn-primary w-100 py-3'>Upload</button>
                        </form>
                    </div>
                    <p className='textUpload'>Upload pictures of infected teeth</p>
                    <div className="result">
                        <h4 className=' text-uppercase'>{result ? result.split("_").join(" ") : "result"}</h4>
                    </div>
                </div>
                <div className="detailsResult col-md-6 col-12">
                    <h3 className=' text-uppercase'>{result ? result.split("_").join(" ") : "result"}</h3>
                    {/* <h3 className='  '>{result   }</h3> */}
                    <p>{resultTxt ? resultTxt : ""}</p>
                </div>
            </div>
        </section>
    );
}
