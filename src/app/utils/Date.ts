export class DateUtil{
  newDate (){
    const date: Date = new Date();
    return date.getHours()+":"+date.getMinutes()+ (date.getHours() > 12 ? "pm" : "am");
  }
}
