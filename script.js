const levels = [
    { description: "NOW", password: "current time", image: "" },
    { description: "HERE ON EARTH", pattern: /^13°52'(\d{2})"N 100°42'(\d{2})"E$/, range: { aMin: 32, aMax: 44, bMin: 29, bMax: 41 }, image: "" },
    { description: "70369de81416487de7faeb3679c314ffa5004b369d", password: "RAINBOW", image: "" }
];

const attempts = Array(levels.length).fill(0);  // เก็บจำนวนครั้งที่พยายามในแต่ละ LEVEL
let currentLevel = 0;

function updateLevelText() {
    document.getElementById("levelText").textContent = `LEVEL ${currentLevel + 1}: ${levels[currentLevel].description}`;
    const levelImage = document.getElementById("levelImage");

    // แสดงกล่องกรอกข้อมูลเสมอ
    document.getElementById("passwordInput").style.display = "block";

    if (levels[currentLevel].image) {
        levelImage.src = levels[currentLevel].image;
        levelImage.style.display = "block";
    } else {
        levelImage.style.display = "none";
    }
}

updateLevelText();

function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

document.getElementById("checkButton").addEventListener("click", function() {
    document.getElementById("result").textContent = '';
    let userInput = document.getElementById("passwordInput").value;

    if (currentLevel === 0) {
        const currentTime = getCurrentTime();
        if (userInput === currentTime) {
            document.getElementById("result").textContent = `ผ่าน LEVEL ${currentLevel + 1} แล้ว! คุณตอบผิดไปทั้งหมด ${attempts[currentLevel]} ครั้ง`;
            document.getElementById("result").className = 'correct';
            currentLevel++;
            updateLevelText();
        } else {
            attempts[currentLevel]++;
            document.getElementById("result").textContent = `รหัสผ่านผิด! คุณตอบผิดไปแล้ว ${attempts[currentLevel]} ครั้ง`;
            document.getElementById("result").className = 'incorrect';
        }
    } else if (currentLevel === 1) {
        const match = userInput.match(levels[currentLevel].pattern);
        
        if (match) {
            const a = parseInt(match[1]);
            const b = parseInt(match[2]);
            const { aMin, aMax, bMin, bMax } = levels[currentLevel].range;

            if (a >= aMin && a <= aMax && b >= bMin && b <= bMax) {
                document.getElementById("result").textContent = `ผ่าน LEVEL ${currentLevel + 1} แล้ว! คุณตอบผิดไปทั้งหมด ${attempts[currentLevel]} ครั้ง`;
                document.getElementById("result").className = 'correct';
                currentLevel++;
                updateLevelText();
            } else {
                attempts[currentLevel]++;
                document.getElementById("result").textContent = `พิกัดไม่ถูกต้อง! คุณตอบผิดไปแล้ว ${attempts[currentLevel]} ครั้ง`;
                document.getElementById("result").className = 'incorrect';
            }
        } else {
            attempts[currentLevel]++;
            document.getElementById("result").textContent = `รูปแบบพิกัดไม่ถูกต้อง! คุณตอบผิดไปแล้ว ${attempts[currentLevel]} ครั้ง`;
            document.getElementById("result").className = 'incorrect';
        }
    } else if (userInput === levels[currentLevel].password) {
        document.getElementById("result").textContent = `ผ่าน LEVEL ${currentLevel + 1} แล้ว! คุณตอบผิดไปทั้งหมด ${attempts[currentLevel]} ครั้ง`;
        document.getElementById("result").className = 'correct';
        
        if (currentLevel < levels.length - 1) {
            currentLevel++;
            updateLevelText();
        } else {
            let totalAttempts = attempts.reduce((sum, attempts) => sum + attempts, 0);
            let summary = "จำนวนครั้งที่ตอบผิดในแต่ละ LEVEL:<br>";
            for (let i = 0; i < attempts.length; i++) {
                summary += `LEVEL ${i + 1}: ${attempts[i]} ครั้ง<br>`;
            }
            summary += `<br>รวมทั้งหมด: ${totalAttempts} ครั้ง`;
            document.getElementById("result").innerHTML = summary;
            document.getElementById("result").className = 'summary';

            // ซ่อนกล่องกรอกและปุ่มตรวจสอบหลังจากแสดงสรุป
            document.getElementById("passwordInput").style.display = "none";
            document.getElementById("checkButton").style.display = "none";
            document.getElementById("levelImage").style.display = "none";
            document.getElementById("levelText").style.display = "none";
        }
    } else {
        attempts[currentLevel]++;
        document.getElementById("result").textContent = `รหัสผ่านผิด! คุณตอบผิดไปแล้ว ${attempts[currentLevel]} ครั้ง`;
        document.getElementById("result").className = 'incorrect';
    }

    document.getElementById("passwordInput").value = '';
});
