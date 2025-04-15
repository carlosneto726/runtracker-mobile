export default function getTimeDifference(startTimestamp: number, endTimestamp: number): string {
    let diffMs = endTimestamp - startTimestamp;

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    diffMs %= (1000 * 60 * 60);

    const minutes = Math.floor(diffMs / (1000 * 60));
    diffMs %= (1000 * 60);

    const seconds = Math.floor(diffMs / 1000);

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
