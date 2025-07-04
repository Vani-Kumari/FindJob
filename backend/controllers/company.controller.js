import { Company } from "../models/company.model.js";;
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";


export const registerCompany= async(req,res)=>{
    try {
        const {companyName}= req.body;
        if(!companyName){
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }
        let company= await Company.findOne({name:companyName});
        if(company){
            return res.status(400).json({
                message: "You can't register same company",
                success: false
            })
        };
        company= await Company.create({
            name:companyName,
            userId: req.id
        });
        return res.status(201).json({
            message: "Company Registered Successfully.",
            company,
            success: true
        });


    } catch (error) {
        console.log(error);
    }
}
export const getCompany= async(req,res)=>{
    try {
        const userId=req.id;
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            });

        }
        return res.status(200).json({
            companies,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getCompanyById= async(req,res)=>{
    try {
        const companyId=req.params.id;
        const company= await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message: "Company not found.",
                success:false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;

        // Validation: Check if required fields are missing
        if (!name || !description || !website || !location) {
            return res.status(400).json({
                message: "Some required fields are missing: name, description, website, or location.",
                success: false
            });
        }

        // Handle file upload (logo)
        let logo;
        if (req.files && req.files['file'] && req.files['file'][0]) {
            const file = req.files['file'][0];
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content, { resource_type: 'image' });
            logo = cloudResponse.secure_url;
        }

        const updateData = { name, description, website, location };
        if (logo) updateData.logo = logo;

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company information updated successfully.",
            success: true,
            company
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
