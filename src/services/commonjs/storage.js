import { storage } from "../firebase";
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'

export const upload = async (file) => { 

    try {
        
    

    console.log('upload/file:', file)
    
    // Création de la référence
    const imageRef = ref( storage, `image/${file.name}` )

    // Enregistrement du fichier sur firestorage
    const snapShot = await uploadBytes(imageRef, file)

    console.log('snapShot', snapShot)
    
    // récupération de l'url du fichier
    const url = await getDownloadURL(snapShot.ref)
    console.log('url:', url)
    
    return url

    } catch (error) {
        return  null
    }
}