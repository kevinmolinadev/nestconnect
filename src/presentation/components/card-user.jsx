import ProfileDefault from "./profile-default";

const CardUser = ({ profile }) => {
    const { image_url, name, last_name, email } = profile
    return (
        <div className="flex items-center border rounded-md gap-2 p-2 bg-white hover:bg-gray-200 hover:cursor-pointer duration-300 transition-colors">
            <div className="rounded-full overflow-hidden w-12">
                {image_url ? <img className="w-full" src={image_url} alt={name} /> : <ProfileDefault name={name} />}
            </div>
            <div>
                <p className="font-semibold">{name} {last_name}</p>
                <p>{email}</p>
            </div>
        </div>

    )
}
export default CardUser;