// Khai báo 29 Câu hỏi (13 Sinh hoạt + 9 Trầm cảm + 7 Lo âu)
const lifestyleQuestions = [
    { id: 'SleepHours', text: 'Bạn thường ngủ bao nhiêu giờ mỗi đêm?', min: 0, max: 12, step: 0.1, default: 7.0 },
    { id: 'ExerciseFreq', text: 'Số ngày bạn tập thể dục mỗi tuần?', min: 0, max: 7, step: 0.1, default: 3.0 },
    { id: 'ScreenTime', text: 'Thời gian dùng thiết bị điện tử hằng ngày (giờ)?', min: 0, max: 16, step: 0.1, default: 6.0 },
    { id: 'GPA', text: 'Điểm trung bình (GPA) hiện tại của bạn?', min: 0, max: 4, step: 0.01, default: 3.0 },
    { id: 'SocialActivity', text: 'Mức độ tham gia hoạt động xã hội (0-10)?', min: 0, max: 10, step: 0.1, default: 5.0 },
    { id: 'OnlineStress', text: 'Mức độ áp lực từ mạng xã hội (0-10)?', min: 0, max: 10, step: 0.1, default: 5.0 },
    { id: 'AcademicStress', text: 'Mức độ áp lực học tập (0-10)?', min: 0, max: 10, step: 0.1, default: 6.0 },
    { id: 'FamilySupport', text: 'Sự hỗ trợ từ gia đình (0-1)?', min: 0, max: 1, step: 0.01, default: 0.8 },
    { id: 'DietQuality', text: 'Chất lượng ăn uống (0-10)?', min: 0, max: 10, step: 0.1, default: 6.0 },
    { id: 'SelfEfficacy', text: 'Sự tự tin vào bản thân (0-10)?', min: 0, max: 10, step: 0.1, default: 6.0 },
    { id: 'PeerRelationship', text: 'Mức độ hòa hợp với bạn bè (0-10)?', min: 0, max: 10, step: 0.1, default: 7.0 },
    { id: 'FinancialStress', text: 'Áp lực tài chính hiện tại (0-10)?', min: 0, max: 10, step: 0.1, default: 4.0 },
    { id: 'SleepQuality', text: 'Bạn đánh giá chất lượng giấc ngủ của mình (0-10)?', min: 0, max: 10, step: 0.1, default: 6.0 }
];

const clinicalQuestions = [
    // PHQ-9 (1-9)
    "Ít hứng thú hoặc kém vui thích khi làm việc?",
    "Cảm thấy buồn bã, chán nản hoặc tuyệt vọng?",
    "Khó ngủ, ngủ không sâu giấc, hoặc ngủ quá nhiều?",
    "Cảm thấy mệt mỏi hoặc ít năng lượng?",
    "Chán ăn hoặc ăn quá nhiều?",
    "Cảm thấy tồi tệ về bản thân - đánh giá thấp bản thân hoặc cảm thấy đã làm gia đình thất vọng?",
    "Khó tập trung vào những việc như đọc báo hoặc xem tivi?",
    "Di chuyển hay nói năng chậm chạp đến mức người khác có thể nhận ra? Hoặc bồn chồn, không thể ngồi yên?",
    "Có ý nghĩ rằng thà chết đi cho xong, hoặc muốn tự gây tổn thương cho bản thân?",
    // GAD-7 (10-16)
    "Cảm thấy bồn chồn, lo lắng hoặc hồi hộp?",
    "Không thể ngừng lại hoặc kiểm soát được sự lo âu?",
    "Lo lắng quá nhiều về những điều khác nhau?",
    "Cảm thấy khó thư giãn?",
    "Rất bồn chồn đến mức khó có thể ngồi yên?",
    "Trở nên dễ cáu gắt hoặc bực bội?",
    "Cảm thấy sợ hãi như thể có điều gì khủng khiếp sắp xảy ra?"
];

const clinicalOptions = [
    { value: 0, text: "Không bao giờ" },
    { value: 1, text: "Vài ngày" },
    { value: 2, text: "Hơn nửa số ngày" },
    { value: 3, text: "Gần như mỗi ngày" }
];

let answers = new Array(29).fill(0); 
// Gán default values cho nhóm Lifestyle
for(let i=0; i<13; i++) answers[i] = lifestyleQuestions[i].default;

let currentQ = 0; // 0-28

function renderWizard() {
    const qNum = currentQ + 1;
    document.getElementById('wizard-counter').innerText = `Câu ${qNum}/29`;
    document.getElementById('wizard-progress').style.width = `${(qNum/29)*100}%`;
    
    const uiTitle = document.getElementById('wizard-title');
    const uiSub = document.getElementById('wizard-sub');
    
    // Cập nhật Nav state & Headers
    if (currentQ < 13) {
        uiTitle.innerHTML = `Thói quen <span class="italic text-teal-400">Sinh hoạt</span>`;
        uiSub.innerText = "Đánh giá các thói quen cơ bản hàng ngày của bạn để cung cấp dữ liệu nền cho hệ thống AI.";
        document.getElementById('nav-1').className = "nav-item text-teal-300 font-bold border-b-2 border-teal-600 transition-colors";
        document.getElementById('nav-2').className = "nav-item text-slate-400 transition-colors";
        document.getElementById('nav-3').className = "nav-item text-slate-400 transition-colors";
    } else if (currentQ < 22) {
        uiTitle.innerHTML = `Sàng lọc <span class="italic text-teal-400">Trầm cảm</span> (PHQ-9)`;
        uiSub.innerText = "Trong 2 tuần qua, bạn có thường xuyên bị làm phiền bởi vấn đề sau không?";
        document.getElementById('nav-1').className = "nav-item text-slate-400 transition-colors";
        document.getElementById('nav-2').className = "nav-item text-teal-300 font-bold border-b-2 border-teal-600 transition-colors";
        document.getElementById('nav-3').className = "nav-item text-slate-400 transition-colors";
    } else {
        uiTitle.innerHTML = `Sàng lọc <span class="italic text-teal-400">Lo âu</span> (GAD-7)`;
        uiSub.innerText = "Trong 2 tuần qua, bạn có thường xuyên bị làm phiền bởi vấn đề sau không?";
        document.getElementById('nav-1').className = "nav-item text-slate-400 transition-colors";
        document.getElementById('nav-2').className = "nav-item text-slate-400 transition-colors";
        document.getElementById('nav-3').className = "nav-item text-teal-300 font-bold border-b-2 border-teal-600 transition-colors";
    }

    const qNumStr = qNum < 10 ? '0'+qNum : qNum;
    let html = '';

    // Render type
    if (currentQ < 13) {
        // Sinh hoat -> Slider Component
        const qData = lifestyleQuestions[currentQ];
        const val = answers[currentQ];
        
        html = `
            <div class="flex gap-4 mb-10">
                <span class="text-4xl md:text-5xl font-extrabold text-teal-900/30 select-none">${qNumStr}</span>
                <h2 class="text-xl md:text-2xl font-bold text-teal-50 leading-snug">${qData.text}</h2>
            </div>
            <div class="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl mt-4">
                <div class="flex justify-between items-center mb-6">
                    <label class="text-teal-100 font-medium text-lg">Mức lựa chọn của bạn:</label>
                    <span id="slider-val" class="bg-teal-900/40 text-teal-300 px-4 py-2 rounded-xl text-xl font-bold border border-teal-800/50">${val}</span>
                </div>
                <input type="range" min="${qData.min}" max="${qData.max}" step="${qData.step}" value="${val}" 
                       oninput="updateSlider(this.value)"
                       class="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500">
                <div class="flex justify-between text-slate-500 text-sm mt-4 font-bold">
                    <span>${qData.min}</span>
                    <span>${qData.max}</span>
                </div>
            </div>
        `;
    } else {
        // Nghiep vu lam sang -> 4 Buttons
        const clinicalIdx = currentQ - 13;
        const qText = clinicalQuestions[clinicalIdx];
        
        html = `
            <div class="flex gap-4 mb-10">
                <span class="text-4xl md:text-5xl font-extrabold text-teal-900/30 select-none">${qNumStr}</span>
                <h2 class="text-xl md:text-2xl font-bold text-teal-50 leading-snug">${qText}</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        `;

        clinicalOptions.forEach(opt => {
            const isSelected = answers[currentQ] === opt.value;
            const btnClass = isSelected ? 
                "flex items-center justify-between p-5 rounded-2xl bg-teal-900/30 border-2 border-teal-500 shadow-lg shadow-teal-500/10 group text-left" : 
                "flex items-center justify-between p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-teal-500/50 hover:bg-teal-950/20 transition-all duration-300 group text-left";
            
            const circleClass = isSelected ? 
                `<div class="w-6 h-6 rounded-full border-2 border-teal-500 flex items-center justify-center"><div class="w-3 h-3 rounded-full bg-teal-500 scale-100"></div></div>` :
                `<div class="w-6 h-6 rounded-full border-2 border-slate-700 group-hover:border-teal-500 transition-colors flex items-center justify-center"><div class="w-3 h-3 rounded-full bg-teal-500 scale-0 group-hover:scale-100 transition-transform"></div></div>`;
                
            const textClass = isSelected ? "text-teal-100 font-bold" : "text-slate-300 font-medium group-hover:text-teal-200";

            html += `
                <button type="button" onclick="selectOption(${opt.value})" class="${btnClass}">
                    <span class="${textClass}">${opt.text}</span>
                    ${circleClass}
                </button>
            `;
        });
        html += `</div>`;
    }

    document.getElementById('wizard-question-container').innerHTML = html;

    const nextBtn = document.getElementById('btn-next-question');
    if (currentQ === 28) {
        nextBtn.innerHTML = `<span>Hoàn tất AI</span><span class="material-symbols-outlined">analytics</span>`;
        nextBtn.className = "bg-teal-600 hover:bg-teal-500 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-teal-900/20";
    } else {
        nextBtn.innerHTML = `<span>Tiếp tục</span><span class="material-symbols-outlined">arrow_forward</span>`;
        nextBtn.className = "bg-teal-700 hover:bg-teal-600 text-teal-50 px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-teal-900/20";
    }
}

function updateSlider(val) {
    document.getElementById('slider-val').innerText = val;
    answers[currentQ] = parseFloat(val);
}

function selectOption(val) {
    answers[currentQ] = val;
    renderWizard();
}

function startSurvey() {
    document.getElementById('phase-welcome').classList.add('hidden');
    document.getElementById('phase-wizard').classList.remove('hidden');
    document.getElementById('phase-wizard').classList.add('flex');
    window.scrollTo(0, 0);
    renderWizard();
}

function prevQuestion() {
    if (currentQ > 0) {
        currentQ--;
        renderWizard();
    } else {
        // Quay lại trang chào mừng
        document.getElementById('phase-wizard').classList.add('hidden');
        document.getElementById('phase-wizard').classList.remove('flex');
        document.getElementById('phase-welcome').classList.remove('hidden');
        window.scrollTo(0, 0);
    }
}

async function nextQuestion() {
    if (currentQ < 28) {
        currentQ++;
        renderWizard();
    } else {
        submitSurvey();
    }
}

async function submitSurvey() {
    // Show loading
    document.getElementById('loader-overlay').classList.add('active');
    
    // Đóng gói data
    const data = {};
    for (let i = 0; i < 13; i++) {
        data[lifestyleQuestions[i].id] = answers[i];
    }
    for(let i=0; i<9; i++) data[`phq${i+1}`] = answers[i + 13];
    for(let i=0; i<7; i++) data[`gad${i+1}`] = answers[i + 22];

    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        
        document.getElementById('loader-overlay').classList.remove('active');
        document.getElementById('phase-wizard').classList.add('hide');
        document.getElementById('phase-result').classList.remove('hide');
        document.getElementById('phase-result').style.display = 'flex';

        // Xử lý lâm sàng
        let phqLevel = ""; let hasRisk = false;
        if (result.phq9_score >= 20) { phqLevel = "Rất nặng"; hasRisk = true; }
        else if (result.phq9_score >= 15) { phqLevel = "Nặng"; hasRisk = true; }
        else if (result.phq9_score >= 10) { phqLevel = "Trung bình"; hasRisk = true; }
        else if (result.phq9_score >= 5) { phqLevel = "Nhẹ"; }
        else { phqLevel = "Bình thường"; }

        let gadLevel = "";
        if (result.gad7_score >= 15) { gadLevel = "Nặng"; hasRisk = true; }
        else if (result.gad7_score >= 10) { gadLevel = "Trung bình"; hasRisk = true; }
        else if (result.gad7_score >= 5) { gadLevel = "Nhẹ"; }
        else { gadLevel = "Bình thường"; }

        let finalPred = result.prediction;
        if (hasRisk && finalPred === 0) finalPred = 1;

        // Cập nhật UI kết quả
        document.getElementById('res-phq-score').innerText = result.phq9_score;
        document.getElementById('res-phq-level').innerText = "Mức độ: " + phqLevel;
        document.getElementById('res-gad-score').innerText = result.gad7_score;
        document.getElementById('res-gad-level').innerText = "Mức độ: " + gadLevel;

        const iconContainer = document.getElementById('result-icon-container');
        const diag = document.getElementById('result-diagnosis');
        const resAdvice = document.getElementById('res-advice');

        if (finalPred === 1) {
            iconContainer.className = "inline-flex rounded-full p-6 mb-6 bg-red-900/30 text-red-500 pulse";
            iconContainer.innerHTML = '<span class="material-symbols-outlined text-6xl">warning</span>';
            diag.innerText = 'CẦN CHÚ Ý CAO ĐỘ';
            diag.className = 'text-4xl md:text-5xl font-extrabold text-red-500 mb-8';
            document.getElementById('res-phq-level').className = 'mt-2 text-sm font-semibold text-red-400';
            document.getElementById('res-gad-level').className = 'mt-2 text-sm font-semibold text-red-400';
            resAdvice.innerHTML = "Dựa trên đánh giá lâm sàng và AI, bạn đang có dấu hiệu ở <strong>nhóm nguy cơ</strong>. Lời khuyên của chúng tôi là hãy tìm kiếm sự quan tâm, trò chuyện hoặc tư vấn từ chuyên gia tâm lý sớm nhất có thể.";
        } else {
            iconContainer.className = "inline-flex rounded-full p-6 mb-6 bg-teal-900/30 text-teal-400 pulse";
            iconContainer.innerHTML = '<span class="material-symbols-outlined text-6xl">shield_check</span>';
            diag.innerText = 'BÌNH THƯỜNG';
            diag.className = 'text-4xl md:text-5xl font-extrabold text-teal-400 mb-8';
            document.getElementById('res-phq-level').className = 'mt-2 text-sm font-semibold text-teal-400';
            document.getElementById('res-gad-level').className = 'mt-2 text-sm font-semibold text-teal-400';
            resAdvice.innerHTML = "Phân tích từ máy học cho thấy sức khỏe tâm lý của bạn hiện tại khá ổn định. Hãy duy trì thói quen tập luyện và ăn uống lành mạnh nhé!";
        }

    } catch (e) {
        alert("Có lỗi từ máy chủ. Vui lòng F5.");
        document.getElementById('loader-overlay').classList.remove('active');
    }
}

// Khởi động khi Sẵn sàng (Không tự động render wizard nữa)
// renderWizard();
