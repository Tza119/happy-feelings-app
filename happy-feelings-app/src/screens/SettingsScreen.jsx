import React, { useState } from "react";

function PasswordSettings() {
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [message, setMessage] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    if (newPwd !== confirmPwd) {
      setMessage("New passwords do not match.");
      return;
    }
    setMessage("Password updated locally (demo only).");
    setOldPwd("");
    setNewPwd("");
    setConfirmPwd("");
  };

  return (
    <div className="card">
      <h3>Change password</h3>
      <form onSubmit={handleSave} className="form">
        <label>
          Enter old password
          <input
            type="password"
            value={oldPwd}
            onChange={(e) => setOldPwd(e.target.value)}
          />
        </label>
        <label>
          Enter new password
          <input
            type="password"
            value={newPwd}
            onChange={(e) => setNewPwd(e.target.value)}
          />
        </label>
        <label>
          Confirm password
          <input
            type="password"
            value={confirmPwd}
            onChange={(e) => setConfirmPwd(e.target.value)}
          />
        </label>
        <button type="submit" className="primary">
          Save Password
        </button>
      </form>
      {message && <p className="muted small">{message}</p>}
    </div>
  );
}

function StaticPage({ title, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="static-text">{children}</div>
    </div>
  );
}

/* 🔽 New: FAQ with chat box */
function FAQWithChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { id: Date.now(), text }]);
    setInput("");
  };

  return (
    <div className="card">
      <h3>FAQ</h3>
      <div className="static-text">
        <p>
          <strong>What is Happy Feelings app?</strong> It&apos;s a wellbeing app
          that helps you set SMART goals, track progress, and build
          happiness habits.
        </p>
        <p>
          <strong>How do I get started?</strong> Create an account, complete
          your benchmarking, then start adding Happy Bank items and goals.
        </p>
        <p>
          <strong>What are Happy Bank points?</strong> These are positive
          moments or activities that make you feel good. They help motivate
          you to engage with your goals.        
        </p>

        <hr />

        <h4>Ask a question</h4>
        <div className="faq-chat">
          <div
            className="faq-chat-messages"
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "8px",
              marginBottom: "8px",
              maxHeight: "160px",
              overflowY: "auto",
              fontSize: "0.9rem",
            }}
          >
            {messages.length === 0 ? (
              <p className="muted small">
                No questions yet. Type a message below to start a conversation.
              </p>
            ) : (
              messages.map((m) => (
                <p key={m.id} className="small">
                  <strong>You:</strong> {m.text}
                </p>
              ))
            )}
          </div>

          <form
            onSubmit={handleSend}
            className="faq-chat-form"
            style={{ display: "flex", gap: "8px" }}
          >
            <input
              type="text"
              placeholder="Ask a question about the app..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ flex: 1 }}
            />
            <button type="submit" className="primary">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* 🔽 Reusable collapsible section component */
function CollapsibleSection({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          textAlign: "left",
          background: "none",
          border: "none",
          padding: "0",
          cursor: "pointer",
          fontSize: "1rem",
          fontWeight: "600",
          marginBottom: open ? "0.5rem" : 0,
        }}
      >
        {open ? "▼ " : "▶ "} {title}
      </button>
      {open && <div className="static-text">{children}</div>}
    </div>
  );
}

export default function SettingsScreen({ user, onLogout, onClose }) {
  return (
    <div className="screen">
      <header className="top-bar">
        <button className="icon-button" onClick={onClose}>←</button>
        <h1 className="app-title">Settings</h1>
      </header>
      <div className="screen">
        <div className="card">
          <h3>My Profile</h3>
          <p className="muted small">Name: {user?.profile?.fullName || user?.name}</p>
          <p className="muted small">Email: {user?.email}</p>
          {user?.profile?.phone && (
            <p className="muted small">Phone: {user.profile.phone}</p>
          )}
          {user?.profile?.gender && (
            <p className="muted small">Gender: {user.profile.gender}</p>
          )}
          {user?.profile?.ethnicity && (
            <p className="muted small">Ethnicity: {user.profile.ethnicity}</p>
          )}
        </div>

        <PasswordSettings />

        {/* 🔽 FAQ now has chat box */}
        <FAQWithChat />

        {/* 🔽 Now collapsible Terms & Conditions */}
        <CollapsibleSection title="Terms & Conditions">
          <p>
            TERMS AND CONDITIONS
AGREEMENT TO OUR LEGAL TERMS
Welcome! These Terms and Conditions (“Terms”) govern your use of the Happy Feelings App Mobile application (“APP”). By downloading and using the App, you agree to be bound by these terms and conditions. If you disagree with any parts of these terms, then you may not access or use the App.
These Legal terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity (‘you’), and Happy Feelings App, concerning your access to and use of the Service. You agree that by accessing the service, you have read, understood, and agreed to be bound by all these Legal Terms. If you do not agree with all these legal terms, then you are expressly prohibited from using the services.
We will provide you with prior notice of any scheduled changes to the Service you are using. By continuing to use the Services after the effective date of any changes, you agree to be bound by the modified terms. 

TABLE OF CONTENTS

    1) Our Services
The Services are not intended for use or distribution in any jurisdiction where such use would violate local laws or regulations, or where it would require us to obtain any registration or licensing. Users who access the Services from outside our primary operating locations do so on their own initiative and are solely responsible for complying with any applicable local laws.

    2) Account and Use
    • You must be at least 18 years old to use the App. 
    • A parent or legal guardian who is creating an account for a minor should review this Agreement with the minor to ensure that they both understand it. 
    • You are responsible for creating and maintaining the confidentiality of your account information, including your surname and password.
    • You are solely responsible for all activities that occur under your account 
    • You agree to use the App for lawful purposes only and in accordance with these Terms. 

    3) USER REPRESENTATIONS
By using the Services, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3)  you have the legal capacity and you agree to comply with these Legal Terms; (4) you are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the Services.


    4) SERVICES AND CONTENT USAGE RULES
Your use of the Service and Content must follow the rules outlined in this section (“Usage Rules”). Any other use of the Services and Content is a material breach of this Agreement. Happy Feelings App may monitor your use of the Services and Content to ensure that you are following these Usage Rules. 

All Services:
    • You may use the Services and Content only for personal, non-commercial purposes. 
    • Happy Feelings App does not consent to the User using any information obtained from the Services to harass, abuse, or harm another person. 
    • It is your responsibility not to lose, destroy, or damage Content once downloaded. We encourage you to back up your Content regularly.
    • You may not use the Services to plan or engage in any illegal activity, or use the Services for the commission or facilitation of illegal activity.

    5) YOUR SUBMISSIONS TO OUR SERVIES
    • Our Services may allow you to submit or post materials such as comments, ratings and reviews, pictures, videos. 
    • Your use of such features must comply with the Submissions Guidelines below, which may be updated from time to time, and if we become aware of materials that violate our Submission Guidelines, we will remove them. If you see materials that do not comply with the Submissions Guidelines, including any offensive, abusive, or illegal content, please let us know.
    • If regulated user-generated content (as defined in s. 55 of the UK Online Safety Act 2023), which you generate, upload or share, is removed from any of the Services, or access to it is restricted in breach of these terms and conditions, you have a right to bring proceedings for breach of contract.

    6) CONTRACT CHANGES
Happy Feelings App reserves the right at any time to modify this Agreement and to add new or additional terms or conditions on your use of the Services. Such modifications and additional terms and conditions will be communicated to you and if accepted, will be effective immediately and will be incorporated into this Agreement. In the event you refuse to accept such changes, Happy Feelings App will have the right to terminate the Agreement.
    7) THIRD-PARTY MATERIALS
Happy Feelings App is not responsible or liable for third-party materials included within or linked from the Content or the Services.
    8) USER SAFETY
You should always seek the advice of an appropriately qualified healthcare professional regarding (a) the safety and advisability of any given activity, or (b) any specific medical condition or symptoms.

    9) INTELLECTUAL PROPERTY RIGHTS

We are the owner or the licensee of all Intellectual Property rights in our Services, including all source code, database, software, website design, audio, video, text, photographs, and graphics in the Service (“Content”), as well as the trademarks, service marks, and logos contained therein (the “Marks”)

You agree that you will not use such proprietary information or materials in any way whatsoever except for use of the Services for personal, non-commercial uses in compliance with this Agreement.
You agree not to modify, rent, loan, sell, share, or distribute the Services or Content in any manner, and you shall not exploit the Services in any manner not expressly authorised. 

          </p>
        </CollapsibleSection>

        {/* 🔽 Now collapsible Privacy Policy */}
        <CollapsibleSection title="Privacy Policy">
          <p>
            Happy Feelings App – Privacy Policy

Last updated: [12-05.2025]
Thank you for installing and signing up with the Happy Feelings App. We are delighted to welcome you to use our app to assist you with your self-esteem. Your data privacy is invaluably important to the protection and use of our app, as we strive to help you feel confident and comfortable when registering and using our wellbeing app. Our Privacy Policy explains, in clear, simple terms, what information we collect, why we collect it, and how we keep it safe.
1. Account Information
We collect the basic details needed to create and protect your account. Under Article 4, section 1 of the UK General Data Protection Regulations 2021, this falls under “personal data relating to the data subject.”
This includes your:
    • Username
    • Email address
    • Password (always “stored in a manner that ensures appropriate security,” using hashing and salting)
These details allow us to deliver the service you sign up for and keep your account secure.

2. Goals and Tasks
To support your wellbeing journey, we collect information relating to the goals and tasks you set within the app. Under Article 14 of the UK GDPR 2021, this is information from when your personal data is “obtained”, it will “provide from the data subject with all the following information”:
    • Goal titles, descriptions, and deadlines
    • Task titles, descriptions, and deadlines
    • Any updates or modifications you make to your goals or tasks
This helps the app function properly, and for the purpose of providing the service, tailoring its features to your needs

3. Progress Data
We collect information that allows you to track your growth over time.

Under Article 13, section 1 subsection c, of the UK GDPR 2021, we must specify “the purposes of the processing for which the personal data are intended as well as the legal basis for the processing”, which means it’s our obligation to explain why we are collecting and using your data, as well as, the legal rule we are allowed to do so, in this case, it includes:
    • Completion status of tasks
    • Dates the goals or milestones you complete
This enables us to provide meaningful insights and track your achievements.

4. Device Information
Under Article 6, section 1 subsection f of the UK GDPR 2021, “processing is necessary for the purposes of the legitimate interests pursued by the controller” – Processing your technical data by us, being the controller, is due to our legitimate interests to consistently work on security, troubleshooting, and compatibility purposes.

This includes:
    • Device type
    • Operating system version
    • A unique device identifier
This helps us diagnose issues, maintain security, and optimise app performance.

5. App Usage Data
Moreover, in compliance with Article 6, section 1, subsection f of the UK GDPR 2021, as stated above, we collect information on how you interact with the app.

This can include:
    • The features you use
    • Frequency of your app interactions
    • Your general behaviour patterns within the app
This allows us to understand user needs and improve the overall experience.
In accordance with Article 13 of the UK GDPR 2021, we explain both why we use your personal data (the purposes of processing) and the legal basis that allows us to process it.
We use your information to:
    • Run and improve the app — so core features function properly, and updates work smoothly (legal basis: performance of a contract and legitimate interests).
    • Personalise your experience — tailoring goals, reminders, insights, and content to support your wellbeing journey (legal basis: legitimate interests or consent for optional features).
    • Provide user support — helping you with technical issues, account queries, or feature requests (legal basis: performance of a contract).
    • Keep the app secure — detecting unusual activity, preventing misuse, and protecting your account (legal basis: legitimate interests).
    • Improve performance and fix issues — analysing errors, reviewing usage patterns, and enhancing the overall stability of the app (legal basis: legitimate interests).
This ensures you understand both what we use your data for and the legal justification behind each type of processing, as required by the UK GDPR 2021.
    1. Who We Share Your Information With (with references from the UK GDPR 2021 and the Data Protection Act 2018)
We only share your personal information when it is genuinely necessary. We never sell your data, and we do not provide your information to any unauthorised third parties.
Under Article 13, section 1, subsection e of UK GDPR, we must inform you of “the recipients or categories of recipients of the personal data.”
Happy Feelings may share your information with the following:

1. Trusted Service Providers
We work with carefully selected third-party partners who support the app’s technical functions, such as cloud storage, analytics, or security tools. These providers only receive the minimum amount of data necessary, and under Article 28 section 3 of the UK GDPR 2021, they must offer “sufficient guarantees” to implement appropriate “technical and organisational measures” to keep your information secure.
Examples include:
    • Secure cloud database hosting
    • Analytics used to improve the app
    • Error monitoring tools to fix issues quickly
These partners process your data only on our instructions, never for their own benefit.

2. Legal Requirements
We may share information if we are required to comply with legal obligations. Under Article 6, section 1 subsection c of the UK GDPR 2021, we may process (and therefore disclose) data when it is “necessary for compliance with a legal obligation to which the controller is subject.”
This may include sharing information where required under the DPA 2018 in circumstances such as:
    • A lawful request from a regulatory authority
    • Compliance with a valid court order
    • Responding to legal investigations
We only share what is strictly necessary to comply with the law.

3. Safety and Security
We may share certain information when necessary to protect the safety, rights, or security of our users, the app, or the public.
This is permitted under:
    • Article 6 section 1, subsection f, of the UK GDPR 2021 – processing necessary for our “interests”, including “ensuring network and information security” (Recital 49).
    • Article 6, section 1, subsection c, of the UK GDPR 2021 – when sharing data is necessary to comply with a legal obligation.
    • DPA 2018, Schedule 1, Part 2 – which allows processing for preventing or detecting unlawful acts, including cyber-attacks or attempted hacking.
In these situations, we may share information with:
    • Law enforcement authorities (e.g., police, cybercrime units)
    • Regulatory bodies
    • Government security or fraud-prevention agencies
    • Information Commissioner’s Office, where required under Sections 142–154 DPA 2018
    • Professional cybersecurity teams assisting in threat investigations
We only share the minimum amount of information necessary, and only when legally justified.
This is to:
    • Preventing fraud or misuse
    • Investigating harmful behaviour
    • Protecting the safety of users or the platform
Sharing occurs only when the risk is genuine and legitimate. And these disclosures are strictly limited to situations where sharing the data is necessary for preventing harm, investigating potential security threats, or complying with lawful requests.

We Never Sell Your Data
In line with transparency principles in Article 5, section 1, subsection a of the UK GDPR 2021, we confirm we do not sell, trade, or exchange your personal data with external companies, advertisers, or marketing institutions.
Your information is used solely to operate and improve the Happy Feelings app.
4. How We Store and Protect Your Information (with references from the UK GDPR 2021 and the DPA 2018)
We take the security of your personal information seriously. In line with Article 5 section 1, subsection f, of the UK GDPR 2021, we ensure your data is processed in a way that guarantees “appropriate security of the personal data, including protection against unauthorised or unlawful processing… using appropriate technical or organisational measures.”
To keep your information safe, we use:
    • Encrypted connections (HTTPS/TLS) to protect data in transit
Encrypted Connections (HTTPS/TLS):
When you use the app, your information travels over the internet using a secure, protected connection called HTTPS, which means the data is encrypted. This encryption is done using TLS (Transport Layer Security), a technology that scrambles your data so that no one can read it while it’s being sent. In simple terms, HTTPS + TLS keep your information safe during transmission by making it unreadable to hackers, attackers, or anyone trying to intercept it.
    • Secure password hashing and salting, meeting the requirement for “integrity and confidentiality”
    • Strict access controls, ensuring only authorised personnel can handle data
    • Regular security checks, testing, and updates as part of our ongoing duty to maintain safe systems

Where Your Data Is Stored
Your data may be stored on secure servers located in the UK or in other approved regions that offer an “adequate level of protection” under Article 45 of the UK GDPR 2021.
If data is stored outside the UK, we use legally recognised safeguards such as standard contractual clauses in accordance with Article 46 of the UK GDPR 2021.
All storage locations must meet UK GDPR data protection standards.

How Long We Keep Your Information
Under Article 5, section 1, subsection e of the UK GDPR 2021, personal data must be kept “no longer than is necessary for the purposes for which the personal data are processed.”
We follow this rule by:
    • Keeping your data only as long as needed to provide the service
    • Deleting or anonymising your data when it is no longer required
    • Applying strict retention limits for different types of information

Account Deletion
If you choose to delete your Happy Feelings account, we will securely delete or irreversibly anonymise your personal data.

However, we may retain certain limited information where required to meet specific legal obligations.
Under Article 6, section 1, subsection c of the UK GDPR 2021 and the DPA 2018, we may need to keep certain data for:
1. Compliance with Statutory Duties (DPA 2018, Part 5)
We may retain information where necessary to fulfil obligations related to:
    • Cooperation with the Information Commissioner
(e.g., responding to assessment notices, investigation notices, or enforcement notices under Sections 142–154 DPA 2018)
    • Maintaining audit and accountability records is required during regulatory reviews or investigations.
2. Prevention, Detection and Investigation of Misconduct (DPA 2018, Schedule 1, Part 2)
We may keep minimal data where necessary for:
    • Preventing or detecting unlawful acts, such as fraudulent account activity
    • Protecting users and the service from malicious behaviour
This falls under the condition allowing processing for “crime and fraud prevention”.
3. Compliance with Legal Claims (DPA 2018, Schedule 1, Paragraph 5)
We may retain data where necessary for:
    • Establishing, exercising, or defending legal claims
(e.g., disputes, misuse reports, or safeguarding concerns)
This ensures we can respond properly if a legal issue arises after account deletion.

5. Your Privacy Rights
Under the UK GDPR 2021, you have several important rights over your personal information. These rights ensure transparency, control, and fairness in how your data is handled.
In accordance with Articles 12–21 of the UK GDPR 2021, you have the right to:

1. Right of Access (Article 15)
You can request confirmation of whether we process your data and obtain a copy of your personal information, “as well as other supplementary information.”

2. Right to Rectification (Article 16)
If any information we hold is inaccurate or incomplete, you can ask us for the “rectification of inaccurate personal data” without delay.

3. Right to Erasure (Article 17)
You may request that we delete your information in certain circumstances. This is sometimes known as the “right to be forgotten.”

4. Right to Restrict Processing (Article 18)
You can ask us for your “restriction of processing” of your data where, for example, accuracy is disputed, or processing is unlawful.

5. Right to Data Portability (Article 20)
You have the right to receive your data “in a structured, commonly used and machine-readable format” and to transfer it to another service where technically possible.

6. Right to Object (Article 21)
You can object to certain types of processing, including processing based on “interests, rights and freedoms of the data subject” or for “direct marketing” purposes (we do not engage in direct marketing).

7. Right to Withdraw Consent (Article 7(3))
Where we rely on your consent, you can “withdraw [your] consent at any time,” and this will not affect the lawfulness of any processing already carried out.

How to Use These Rights
To exercise any of your rights, you can contact us directly. We will respond “without undue delay and in any event within one month of receipt of the request. That period may be extended by two further months where necessary, taking into account the complexity and number of the requests.” (Article 12, section 3 of the UK GDPR 2021).
6. Children’s Privacy
Happy Feelings is not designed for individuals under the age of 18, and we do not knowingly collect or process personal data from children.
Under Recital 38 of the UK GDPR 2021, “children merit specific protection with regard to their personal data,” and services must take extra care when they are likely to be accessed by minors.
In line with this principle, if we become aware that a child under 18 has created an account or provided personal information, we will delete their data promptly and close the account, to align with Article 8 of the UK GDPR 2021, which states that children's data requires “specific protection” in the context of online services.
If you believe a child has used the app or provided information, please contact us immediately.

Changes to This Privacy Policy
We may update this Privacy Policy from time to time to reflect changes in our services or in response to legal, technical, or business developments.
If we make significant changes, we will notify you clearly—through the app, by email, or another appropriate method—so you remain informed about how your data is handled.
We encourage you to review this policy periodically.

Contact Us
If you have any questions or concerns about this Privacy Policy, or if you wish to exercise any of your rights, you can reach us using the details below:
Email: [team16@happyfeelingsapp.com]
Address: [123 Happy Feelings Street, London]
We aim to respond promptly and helpfully to all enquiries.
User Agreement Confirmation
Before creating an account or using the Happy Feelings app, you will be asked to confirm your agreement to this Privacy Policy.
You can only proceed after selecting the relevant tick boxes to show that you:
    • ✔️ You acknowledge that you have read and understood this Privacy Policy
    • ✔️ You agree to the collection and use of your information as described
    • ✔️ You confirm that you are over 18 years old
    • ✔️ You consent to optional features (e.g., analytics or personalised content), where applicable
This mirrors industry-standard practice and satisfies the requirements for consent to be “freely given, specific, informed and unambiguous” - Article 4, section 11 of the UK GDPR 201
Tick Box Consent
☐ I confirm that I am 18 or older.
☐ I have read and agree to the Privacy Policy.
☐ I consent to the processing of my personal data for the purposes described.
☐ I consent to optional features such as analytics or personalised insights (optional).
This will be shown:
    • During account creation
    • After a major policy update
    • When enabling optional features
Thank you, and we hope you understand and will comply with our privacy policy
          </p>
        </CollapsibleSection>

        <div className="card">
          <h3>Follow us on social media</h3>
          <ul className="list">
            <li>Facebook</li>
            <li>Instagram</li>
            <li>TikTok</li>
          </ul>
        </div>

        <button className="secondary full" onClick={onLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}
