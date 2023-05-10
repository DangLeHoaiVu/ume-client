import { Dot } from "@icon-park/react"
import { Button } from "antd"

interface MoreButtonProps {
    className: string,
    onClick: () => void
}
const MoreButton = (MoreButtonProps) => {
    const { className, onClick } = MoreButtonProps

    return (
        <Button type="default" className={className || `flex flex-row`} onClick={onClick}>
            <Dot theme="outline" size="8" fill="#fff" />
            <Dot theme="outline" size="8" fill="#fff" />
            <Dot theme="outline" size="8" fill="#fff" />
        </Button>
    )
}
export default MoreButton
