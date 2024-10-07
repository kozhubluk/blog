import styles from './Skeleton.module.scss'

const Skeleton = (props) => {
    const { className, width, height, borderRadius } = props

    const style = {
        width,
        height,
        borderRadius
    }

    return <div style={style} className={styles.skeleton + " " + className}>
    </div>
}

export default Skeleton;