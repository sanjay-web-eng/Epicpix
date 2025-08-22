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
	const fuse = new Fuse(data, { keys: ["ImgName", "ownerUsername", "imageUrl"], threshold: 0.4 });
	const results = userInput ? fuse.search(userInput) : data;
	const items = userInput ? results.map((res) => res.item) : results;
	console.log(items);
	return (
		<>
			<div className="searchArea">
				<input
					type="text"
					value={userInput}
					onChange={(e) => setUserInput(e.target.value)}
					style={{
						width: "100%",
						height: "25px",
						borderRadius: "6px",
						paddingLeft: 10,
						paddingRight: 10,
						border: "2px solid #000",
						margin: "6px",
						backgroundColor: "transparent",
					}}
					placeholder="Search"
				/>
			</div>

			<div className="maina">
				{data.length == 0 && (
					<div
						style={{
							width: "100%",
							justifyContent: "center",
							alignItems: "center",
							display: "flex",
							height: "5px",
							position: "absolute",
						}}
					>
						<BarLoader width="90%" />
					</div>
				)}

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
								</NavLink>
							);
						})
					)
				) : (
					data
						.map((e, index) => {
							return (
								<NavLink to={`https://epicpix.vercel.app/image/${e.id}`} key={index} className="card">
									<img src={e.imageUrl} className="cardImg" alt="" />
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
