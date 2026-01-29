const msgController = () => {
    const sendMessage = async (req, res) => {
        res.status(200).json({msg: "Message sent"});
    };
    return {sendMessage};
};
export default msgController;