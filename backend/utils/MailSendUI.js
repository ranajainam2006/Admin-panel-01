function MailSendUI(otp) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>OTP Verification</title>

<style>
    body{
        margin:0;
        padding:0;
        background:#f2f5f9;
        font-family: Arial, Helvetica, sans-serif;
    }
    .wrapper{
        width:100%;
        padding:40px 0;
        background:#f2f5f9;
    }
    .card{
        max-width:600px;
        background:#ffffff;
        margin:auto;
        border-radius:12px;
        overflow:hidden;
        box-shadow:0 10px 25px rgba(0,0,0,0.1);
    }
    .header{
        background:linear-gradient(135deg,#0d6efd,#0b5ed7);
        padding:30px;
        text-align:center;
        color:white;
    }
    .header h1{
        margin:0;
        font-size:26px;
    }
    .header p{
        margin-top:10px;
        font-size:15px;
        opacity:0.9;
    }
    .content{
        padding:40px;
        text-align:center;
    }
    .content h2{
        margin-top:0;
        color:#333;
    }
    .content p{
        color:#555;
        font-size:16px;
        line-height:24px;
    }
    .otp-box{
        margin:30px auto;
        display:inline-block;
        padding:18px 40px;
        font-size:28px;
        font-weight:bold;
        letter-spacing:6px;
        color:#0d6efd;
        border:2px dashed #0d6efd;
        border-radius:10px;
        background:#f8faff;
    }
    .note{
        color:#777;
        font-size:14px;
        margin-top:25px;
    }
    .footer{
        background:#f8f9fa;
        padding:20px;
        text-align:center;
        font-size:13px;
        color:#888;
    }
</style>

</head>

<body>

<div class="wrapper">
    <div class="card">

        <div class="header">
            <h1>🔐 Secure Verification</h1>
            <p>Verify your account with OTP</p>
        </div>

        <div class="content">
            <h2>Hello 👋</h2>
            <p>
                We received a request to verify your account.  
                Please use the OTP below to complete the process.
            </p>

            <div class="otp-box">
                ${otp}
            </div>

            <div class="note">
                ⏳ This OTP is valid for <b>10 minutes</b>.  
                Do not share it with anyone.
            </div>
        </div>
    </div>
</div>

</body>
</html>
`
}


module.exports = MailSendUI