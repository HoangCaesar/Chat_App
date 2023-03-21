const resetPassword = (name, url) => {
    return `
    <div style="position: relative; height: 100vh; width: 100%;  background-color: #efefef">
        <div style="padding: 36px 0;width: 100%; text-align: center">
            <a href="#" style=" font-size: 24px; font-weight: 500; color: #030303; letter-spacing: 1px; text-decoration: none">Nets</a>
        </div>
            <div
                style="position: absolute; margin: auto; padding: 25px 50px;  width: 65%;  height: 58%; background-color: white; border-radius: 5px;">
                <h4 style="font-size: 20px; font-weight: 400; color: #030303; letter-spacing: 0.75px">Hei ${name},</h4>
                <p style="font-size: 16px; color: #737F8D;">Thanks for registering for an account on Nets! Before we get
                    started, we just need to confirm that this is
                    you. Click below to verify your email address:</p>
                <div style="margin: 50px; text-align: center;">
                    <a href="${url}"
                    style="padding: 15px; font-size: 16px; color: #030303; background-color: #eaff96; text-decoration: none; border-radius: 5px;">Verify
                    Email.</a>
                </div>  
            <div style="margin: 0 0 30px; ; content: ' ' ; display: block; position: absolute; border-bottom: 1px solid lightgray; width: 100%;"></div>

            <div>
                <p style="margin: 0; padding: 0; color: #747F8D">Need help? <a href="#">Contact our support team</a> or hit us up on Instagram <a href="#">@Nets</a>.
                </p>
                <p style="margin: 0; padding: 0; color: #747F8D">Want to give us feedback? Let us know what you think on our <a href="#">feedback site</a>.</p>
            </div>      
        </div>
        <div style="margin: 20px; text-align: center">
            <p style="margin: 5px; padding: 0; font-size: 12px; color: #99AAB5">Sent by Nets - <a href="#">check our blog</a> - <a href="#">@Nets</a>.
            </p>
            <p style="margin: 5px; padding: 0; font-size: 12px; color: #99AAB5">999 Olympia Street, 65200 Vaasa, Finland</p>
        </div>
    </div>
    `;
};

module.exports = resetPassword;
