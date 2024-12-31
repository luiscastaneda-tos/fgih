/* eslint-disable react/prop-types */
export const ThreadId = ({ thread }) => {

    async function handleCopiar() {
        try {
            await navigator.clipboard.writeText(thread);
        } catch (err) {
            alert('Error al copiar: ', err);
        }
    }

    return (
        <>
            {
                thread &&
                <div className="container__thread" onClick={handleCopiar} tabIndex={0}>
                    <p>Thread ID: {thread}</p>
                </div>
            }
        </>
    )
}
