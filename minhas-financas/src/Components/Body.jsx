function Body({children, width = 8}) {
    return (
        <div className="container">
            <div className="row">
                <div
                    className={`col-md-${width}`}
                    style={{ position: "relative", margin: '0 auto' }}
                >
                    <div className="bs-docs-section">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Body;