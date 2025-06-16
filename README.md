# Cách chạy demo web
1. Clone repo về máy
2. Truy cập vào folder fe
3. Tạo 1 file .env với nội dung như sau:
   \n
   DATABASE_URL=postgresql://urbanvista_owner:npg_MRsUt0LGrPp9@ep-yellow-wave-a8g4ezr7-pooler.eastus2.azure.neon.tech/urbanvista?sslmode=require
   BETTER_AUTH_SECRET=3YsKND1GK9mfg11w6m8vqqqteDpfrpA6
   BETTER_AUTH_URL=http://localhost:3000
   \n
5. Khởi tại 1 terminal mới và chạy các lệnh sau:
   - 'npm install'
   - 'npm run build'
   - 'npm run start'
