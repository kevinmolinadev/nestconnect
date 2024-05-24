const ProfileDefault = ({ name }) => {
    console.log(name)
    const firstLetter = name.charAt(0).toUpperCase();
    return (
        <div className="w-full h-full text-3xl bg-yellow-100 text-black flex justify-center items-center">
            {firstLetter}
        </div>
    )
}
export default ProfileDefault;