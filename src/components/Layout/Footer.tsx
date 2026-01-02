const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <h2 className="footer-logo">Lisa AI Employees</h2>
                        <p className="footer-tagline">
                            “Hire AI Employees for your team — scale faster with 24x7 digital teammates.”
                        </p>
                    </div>

                    <div className="footer-links-grid">
                        <div className="footer-column">
                            <h3>Quick Links</h3>
                            <a href="/why-now">Why Now</a>
                            <a href="/ai-employee-core">AI Employee Core</a>
                            <a href="/departments">Departments</a>
                            <a href="/security">Security</a>
                            <a href="/pricing">Pricing</a>
                        </div>
                        <div className="footer-column">
                            <h3>Contact</h3>
                            <a href="mailto:support@lisa.ai">support@lisa.ai</a>
                            <a href="https://www.lisa.ai" target="_blank" rel="noopener noreferrer">www.lisa.ai</a>
                        </div>
                        <div className="footer-column">
                            <h3>Follow Us</h3>
                            <div className="social-links" style={{ flexDirection: 'column', gap: '0.8rem' }}>
                                <a href="#" aria-label="LinkedIn">LinkedIn</a>
                                <a href="#" aria-label="Twitter">Twitter</a>
                                <a href="#" aria-label="YouTube">YouTube</a>
                            </div>
                        </div>
                        <div className="footer-column">
                            <h3>Legal</h3>
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Use</a>
                            <a href="#">Security Policy</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2025 Lisa AI Employees — All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
