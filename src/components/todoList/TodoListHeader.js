import "./todoList.css";

const Header = () => {
    return (
        <div className="todo-header">
            <div style={{ margin: "0 auto" }}>ID</div>
            <div style={{ margin: "0 auto" }}>Title</div>
            <div style={{ margin: "0 auto" }}>Description</div>
            <div style={{ margin: "0 auto" }}>Status</div>
        </div>
    );
};

export default Header;
