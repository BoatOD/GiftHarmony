import '../style/ChirstmasTree.css'; 

const ChristmasTree = () => {
    return (
        <>
            <canvas
                id="canvas"
            ></canvas>
            <svg
                version="1.1"
                id="tree"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 125.8 180"
                enableBackground="new 0 0 125.8 180" 
            >
                <defs>
                    <style>
                        {`
                            .st0 { fill: #332C28; }
                            .st1 { fill: #00513E; }
                            .st2 { fill: #003828; }
                            .st3 { fill: #E7B75C; }
                            .st4 { fill: #B28947; }
                        `}
                    </style>
                </defs>
                <g>
                    <g>
                        <rect x="55.9" y="135" className="st0" width="13.7" height="45" />
                        <polygon
                            className="st1"
                            points="24,84.3 37.5,81.3 14.9,121.7 28.8,118.6 0,170.3 62.6,156.1 62.6,15.3"
                        />
                        <polygon
                            className="st2"
                            points="125.8,170.3 96.9,118.6 110.9,121.7 88.2,81.3 101.7,84.3 62.8,14.9 62.6,15.3 62.6,156.1 62.8,156"
                        />
                    </g>
                    <g id="lights">
                        <g id="blue-lt">
                            <circle className="blue-lt g1" cx="70.2" cy="134.7" r="3.7" />
                            <circle className="blue-lt g3" cx="23.1" cy="147.5" r="4.2" />
                            <circle className="blue-lt g1" cx="59.3" cy="116.9" r="5.8" />
                        </g>
                        <g id="blue-dk">
                            <circle className="blue-dk g3" cx="77.1" cy="55.3" r="4.8" />
                            <circle className="blue-dk g1" cx="98.6" cy="148.6" r="4.5" />
                            <circle className="blue-dk g2" cx="62.7" cy="80.2" r="4.4" />
                        </g>
                        <g id="red">
                            <circle className="red g1" cx="37" cy="125.3" r="5.9" />
                            <circle className="red g1" cx="78.2" cy="95.2" r="5.7" />
                            <circle className="red g2" cx="54.8" cy="144.2" r="3.4" />
                            <circle className="red g2" cx="59.8" cy="44.2" r="5.2" />
                        </g>
                        <g id="gold-lt">
                            <circle className="gold-lt g1" cx="51.7" cy="64.8" r="5.7" />
                            <circle className="gold-lt g2" cx="39.5" cy="140.4" r="4.4" />
                        </g>
                        <g id="gold-dk">
                            <circle className="gold-dk g2" cx="76.9" cy="76.7" r="4.4" />
                            <circle className="gold-dk g3" cx="83.9" cy="125.3" r="4.8" />
                            <circle className="gold-dk g3" cx="46" cy="99.6" r="4.0" />
                        </g>
                    </g>
                    <polygon
                        className="st3"
                        points="59.1,10.5 48,10.5 57.1,17.1 53.6,27.6 62.6,21.1 62.6,0"
                    />
                    <polygon
                        className="st4"
                        points="77.1,10.5 66,10.5 62.6,0 62.6,21.1 71.6,27.6 68.2,17.1"
                    />
                </g>
            </svg>
        </>
    );
};

export default ChristmasTree;
