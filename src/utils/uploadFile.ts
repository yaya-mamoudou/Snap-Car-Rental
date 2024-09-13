import { supabase } from "~/lib/supabase";

type uploadType = 'profile' | 'car' | 'drivers_lisence' | 'insurrance'
export const uploadFiles = async (selectedFiles: string[], type: uploadType) => {
    const uploadPromises = selectedFiles.map(async (file) => {
        const bucketName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME!;
        const filePath = `${type}_${Date.now()}`;
        const blob = base64ToBlob(file)
        const { error } = await supabase.storage.from(bucketName).upload(filePath, blob.blob, { contentType: blob.mimeType });

        if (error) {
            throw error;
        }

        const res = supabase.storage.from(bucketName).getPublicUrl(filePath);
        return res.data.publicUrl;
    });

    const fileUrls = await Promise.all(uploadPromises);
    return fileUrls
};


const base64ToBlob = (base64: string): { blob: Blob; mimeType: string } => {
    // Extract MIME type from the base64 string
    const mimeTypeMatch = base64.match(/data:(.*?);base64/);
    const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : '';

    // Extract Base64 content and decode it
    const base64Content = base64.split(',')[1];
    const byteCharacters = atob(base64Content!);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return { blob: new Blob([byteArray], { type: mimeType }), mimeType: mimeType! };
};
