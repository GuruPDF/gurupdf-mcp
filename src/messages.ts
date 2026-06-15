// User-facing copy the AI agent relays verbatim. The whole point: when a user
// hits a limit, their own assistant reassures them they can keep going, tells
// them how (wait or buy), and hands them a clickable link.

const PRICING = "https://gurupdf.com/pricing";
const BUNDLES = "https://gurupdf.com/pricing#credit-bundles";
const PROFILE = "https://gurupdf.com/profile";

export function outOfCreditsMessage(meta?: Record<string, unknown>): string {
    const need = typeof meta?.credits_required === "number" ? (meta.credits_required as number) : undefined;
    const have = typeof meta?.credits_available === "number" ? (meta.credits_available as number) : undefined;
    const detail = need != null && have != null ? ` This one needs ${need} credit${need === 1 ? "" : "s"} and you have ${have} left.` : "";
    return (
        `You're out of GuruPDF credits for now — but no problem, you can keep using it.${detail} ` +
        `Your free credits refresh every day, so you can wait and try again tomorrow, ` +
        `or top up instantly (from a couple of dollars) here: ${BUNDLES} . ` +
        `For higher daily limits, a plan: ${PRICING}`
    );
}

export function rateLimitedMessage(retryAfter?: number): string {
    const wait = retryAfter && retryAfter > 0 && retryAfter < 3600 ? `about ${retryAfter} second${retryAfter === 1 ? "" : "s"}` : "a moment";
    return (
        `You're converting a little fast for the free tier (2 per minute, 10 per day). ` +
        `Nothing's wrong — just wait ${wait} and I can try again. ` +
        `Want no waiting and higher limits? Upgrade here: ${PRICING}`
    );
}

export function fileTooLargeMessage(name: string, sizeMb: number, limitMb: number): string {
    return (
        `"${name}" is ${sizeMb.toFixed(1)} MB, which is over the ${limitMb} MB limit on your current GuruPDF plan. ` +
        `You can compress it first, or upgrade for larger files: ${PRICING}`
    );
}

export function noApiKeyMessage(): string {
    return (
        `GuruPDF isn't connected yet — I need an API key. ` +
        `Set GURUPDF_API_KEY in this server's MCP config. ` +
        `To get one: sign up at https://gurupdf.com , then open ${PROFILE} → API tokens and create a token. ` +
        `Free accounts include daily credits, so you can start converting right away.`
    );
}
