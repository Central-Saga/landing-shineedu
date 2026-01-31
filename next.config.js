/** @type {import('next').NextConfig} */
const nextConfig = {
    // Ini wajib supaya next/image tidak error di static hosting
    // Walaupun sekarang dynamic, tetap baik untuk optimasi jika diperlukan
    images: {
        unoptimized: true,
    },

    // Optional: supaya URL halaman jadi rapi
    trailingSlash: true,
};

module.exports = nextConfig;
