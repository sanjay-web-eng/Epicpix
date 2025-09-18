import React from "react";
import { FadeLoader } from "react-spinners";
function Loder() {
	return (
		<div
			style={{
				position: "absolute",
				zIndex:99,
				width: "100%",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				background: "#fff",
				color: "#000",
			}}
		>
			<FadeLoader />
		</div>
	);
}

export default Loder;
