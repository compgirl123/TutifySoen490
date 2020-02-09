export function presentableName(name) {
    return name.substring(0, name.lastIndexOf("."));
}

export function presentableExtension(name) {
    return name.substring(name.lastIndexOf(".") + 1);
}

export function presentableUploadTime(time) {
    var date = time.substring(0, 10);
    var hour = time.substring(11, 16);
    return date + " at " + hour;
}