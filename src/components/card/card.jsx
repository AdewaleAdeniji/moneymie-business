export const BalanceCard = (props) => {
    const classes = props.classNames ? props.classNames : '';
    const className = `balance-card ${classes}`;
    return (
        <div className={className}>
            {props.children}
        </div>
    )
}