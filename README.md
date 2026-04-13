# tamlysinhvien - Hệ thống Dự đoán Sức khỏe Tâm thần Sinh viên 🧠

**tamlysinhvien** là một ứng dụng web tích hợp Trí tuệ nhân tạo (AI) giúp tầm soát và dự đoán sớm các vấn đề về sức khỏe tâm thần (Trầm cảm và Lo âu) dành riêng cho sinh viên đại học. Hệ thống sử dụng mô hình Học máy (Machine Learning) được huấn luyện trên dữ liệu thực tế để đưa ra các đánh giá khách quan dựa trên thói quen sinh hoạt và các thang đo tâm lý chuẩn y khoa.

## ✨ Tính năng chính
- **Giao diện hiện đại (Premium UI):** Thiết kế Dark Mode, hiệu ứng Glassmorphism mượt mà và thân thiện.
- **Quy trình làm bài Wizard:** Hệ thống câu hỏi hiển thị từng trang giúp người dùng không bị "ngợp".
- **Kết hợp AI & Lâm sàng:** 
    *   Sử dụng mô hình ML (Random Forest/SVM) để dự đoán dựa trên 15 đặc trưng đầu vào.
    *   Tích hợp thang điểm chuẩn **PHQ-9** (Trầm cảm) và **GAD-7** (Lo âu).
    *   Có hệ thống rào bảo vệ (Guard-rails) ưu tiên đánh giá lâm sàng khi có dấu hiệu nguy cơ cao.
- **Tương thích cao:** Hỗ trợ nhập liệu số thập phân (GPA, giờ ngủ) tương thích hoàn hảo với tập dữ liệu nghiên cứu.

## 🛠 Công nghệ sử dụng
- **Backend:** Python, FastAPI, Uvicorn.
- **Machine Learning:** Scikit-learn, Pandas, Joblib, Numpy.
- **Frontend:** HTML5, Vanilla JavaScript, Tailwind CSS (JIT), Google Fonts (Manrope).

## 📂 Cấu trúc dự án
```text
├── app.py              # Server Backend xử lý API và Logic dự đoán
├── requirements.txt    # Danh sách các thư viện cần cài đặt
├── model.joblib        # Mô hình Machine Learning đã huấn luyện
├── scaler.joblib       # Bộ chuẩn hóa dữ liệu
├── data.csv            # Tập dữ liệu gốc dùng để nghiên cứu
├── mental_health.ipynb # Notebook chi tiết quá trình EDA & Training
├── static/             # Chứa mã nguồn Frontend
│   ├── index.html      # Giao diện chính của ứng dụng
│   └── script.js       # Logic điều hướng và gọi API
└── .gitignore          # Cấu hình bỏ qua các file không cần thiết khi push Git
```

## 🚀 Hướng dẫn cài đặt

### 1. Tải dự án về máy
```bash
git clone https://github.com/USERNAME/tamlysinhvien.git
cd tamlysinhvien
```

### 2. Tạo môi trường ảo (Khuyên dùng)
```bash
python -m venv .venv
# Kích hoạt trên Windows:
.\.venv\Scripts\activate
# Kích hoạt trên Mac/Linux:
source .venv/bin/activate
```

### 3. Cài đặt thư viện
```bash
pip install -r requirements.txt
```

### 4. Chạy ứng dụng
```bash
python app.py
```
Sau đó, hãy truy cập vào địa chỉ: [http://127.0.0.1:8000](http://127.0.0.1:8000)

## ⚠️ Lưu ý quan trọng (Disclaimer)
Kết quả từ bài trắc nghiệm này được đưa ra bởi thuật toán Trí tuệ nhân tạo và các thang đo sàng lọc tâm lý, chỉ mang tính chất **tham khảo và tầm soát sớm**. Kết quả này **KHÔNG thay thế** cho việc chẩn đoán y khoa chuyên nghiệp hoặc tư vấn từ các bác sĩ và chuyên gia tâm lý có chuyên môn. Nếu bạn cảm thấy cần sự giúp đỡ, hãy liên hệ với các trung tâm y tế gần nhất.

---
*Phát triển bởi haribawngg* 🚀
