import styles from '../styles/Home.module.scss'

export default function ResultSection({data,setContactVisible}){
    console.log(data);
    setContactVisible(false)
    data = data["output"]
    let primaryStyle = data[0]

    return(
        <>
            <div className={styles.textcenter}>
                <h1>Your style overview</h1>
            </div>
            <div className={styles.imgrow}>
                {primaryStyle.photo.map((img)=>(
                    <div className={styles.img} key={img.fileId} style={{backgroundImage: `url(${img.url})`}}/>
                ))}
            </div>

            <div className={styles.textcenter}>
                <p className={styles.texttitle}>{primaryStyle.content.styles.replaceAll('_', ' ')}</p>
            </div>

            <div className={styles.textcenter}>
                <p>{primaryStyle.content.details}</p>
            </div>


            <div className={styles.stylerow}>
                <div className={styles.styletip}>
                    <h3>Style Tip 1</h3>
                    <p>
                    {primaryStyle.content.tip_1}
                    </p>
                </div>

                <div className={styles.styletip}>
                    <h3>Style Tip 2</h3>
                    <p>
                    {primaryStyle.content.tip_2}
                    </p>
                </div>
            </div>

            <div className={styles.stylerow}>
                <div className={styles.styletip}>
                    <h3>Style Tip 3</h3>
                    <p>
                    {primaryStyle.content.tip_3}
                    </p>
                </div>

                <div className={styles.styletip}>
                    <h3>Style Tip 4</h3>
                    <p>
                    {primaryStyle.content.tip_4}
                    </p>
                </div>
            </div>


            <div className={styles.stylerow}>
                <div className={styles.styletip}>
                    <h3>Style Tip 5</h3>
                    <p>
                    {primaryStyle.content.tip_5}
                    </p>
                </div>

                <div className={styles.styletip}>
                    <h3>Style Tip 6</h3>
                    <p>
                    {primaryStyle.content.tip_6}
                    </p>
                </div>
            </div>

            <div className={styles.textcenter}>
                <h1>Other recommendations</h1>
            </div>

            <div className={styles.imgrow}>
                {data[1].photo.map((img)=>(
                    <div className={styles.img} key={img.fileId} style={{backgroundImage: `url(${img.url})`}}/>
                ))}
            </div>

            <div className={styles.textcenter}>
                <p className={styles.texttitle}>{data[1].content.styles.replaceAll('_', ' ')}</p>
            </div>

            <div className={styles.textcenter}>
                <p>{data[1].content.details}</p>
            </div>

            <div className={styles.imgrow}>
                {data[2].photo.map((img)=>(
                    <div className={styles.img} key={img.fileId} style={{backgroundImage: `url(${img.url})`}}/>
                ))}
            </div>

            <div className={styles.textcenter}>
                <p className={styles.texttitle}>{data[2].content.styles.replaceAll('_', ' ')}</p>
            </div>

            <div className={styles.textcenter}>
                <p>{data[2].content.details}</p>
            </div>
        </>
    )
}