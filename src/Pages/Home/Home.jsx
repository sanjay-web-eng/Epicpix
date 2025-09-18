import React, { useEffect, useState } from "react";
import "./Home.css";
import { getHomedata } from "../../apis/BackendApisImpl";
import { NavLink } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { loginApi } from "../../apis/BackendApisImpl";
import Fuse from "fuse.js";
function Home() {
	const [userInput, setUserInput] = useState();
	async function name() {
		const a = await getHomedata();
		setdata(a);
	}
	useEffect(() => {
		name();
	}, []);

	const [data, setdata] = useState([]);
	const fuse = new Fuse(data, { keys: ["ImgName", "imageUrl"], threshold: 0.2 });
	const results = userInput ? fuse.search(userInput) : data;
	const items = userInput ? results.map((res) => res.item) : results;
	return (
		<>
			<div
				style={{
					width: "100%",
					position: "sticky",
					top: "57px",
				}}
			>
				{data.length === 0 ? (
					<div
						style={{
							width: "100%",
							justifyContent: "center",
							alignItems: "center",
							display: "flex",
							height: "40px", 
						}}
					>
						<BarLoader width="95%" />
					</div>
				) : (
					<div
						style={{
							width: "100%",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							backdropFilter: "blur(25px) saturate(76%)",
							WebkitBackdropFilter: "blur(25px) saturate(76%)",
							backgroundColor: "rgba(92, 92, 92, 0)",
						}}
					>
						<input
							type="text"
							value={userInput}
							onChange={(e) => setUserInput(e.target.value)}
							style={{
								width: "99%",
								height: "30px",
								borderRadius: "6px",
								border: "2px solid #000",
								margin: "7px 0 5px 0",
								backgroundColor: "transparent",
							 
							}}
							placeholder="Search"
						/>
					</div>
				)}
			</div>

			<div className="maina">
				{userInput ? (
					items.length == 0 ? (
						<h2 style={{ fontFamily: "Arial", width: "99vw", alignItems: "center", display: "flex", justifyContent: "center" }}>
							not found :/
						</h2>
					) : (
						items.map((e, index) => {
							return (
								<NavLink to={`/image/${e.id}`} key={index} className="card">
									<img src={e.imageUrl} className="cardImg" alt="" />	 
									<p className="homeH1">{e.ImgName}</p>
								</NavLink>
							);
						})
					)
				) : (
					data
						.map((e, index) => {
							return (
								<NavLink to={`/image/${e.id}`} key={index} className="card">
									<img src={e.imageUrl} className="cardImg" alt="" />
									<p className="homeH1">{e.ImgName}</p>
								</NavLink>
							);
						})
						.reverse()
				)}
			</div>
		</>
	);
}

export default Home;
 