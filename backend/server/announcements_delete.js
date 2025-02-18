const express= require('express');
const router= express.Router();
const deleteAnnouncements=require('./announcements_model.js');
router.delete('/:id',async(req,res)=>{
    try{
        const announcement=await deleteAnnouncements.findByIdAndDelete(req.params.id);
        if(!announcement){
            return res.status(404).json({message:'Announcement not found'});
        }
        res.status(200).json({message:'Announcement deleted successfully'});
    }catch(error){
        console.error('Error deleting announcement:',error);
        res.status(500).json({message:'Error deleting announcement'});
    }
});