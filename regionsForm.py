from flask_wtf import FlaskForm
from wtforms import StringField,DateField,IntegerField

import datetime
from wtforms.validators import DataRequired, Length,NumberRange

class RegionsData(FlaskForm):
    day = DateField('Date', validators=[], format = '%d/%m/%Y',default=datetime.date.today())
    #day=DateField('Date',format='%d-%m-%y', default=datetime.date.today(),validators=[])
    total = IntegerField("Total confirmés", validators=[])
    confirmes = IntegerField("Nouveaux cas", validators=[])
    gueries = IntegerField('Guéris', validators=[])
    deces = IntegerField('Décès', validators=[])

    tth = IntegerField('Tanger-Tétouan-Al Hoceïma', validators=[])
    chr = IntegerField("l'Oriental", validators=[])
    fmk = IntegerField('Fès-Meknès', validators=[])
    rsk = IntegerField('Rabat-Salé-Kénitra', validators=[])
    bmk = IntegerField('Béni Mellal-Khénifra', validators=[])
    cst = IntegerField('Casablanca-Settat', validators=[])
    msf = IntegerField('Marrakech-Safi', validators=[])
    dtf = IntegerField('Drâa-Tafilalet', validators=[])
    sms = IntegerField('Souss-Massa', validators=[])
    gon = IntegerField('Guelmim-Oued Noun', validators=[])
    lsh = IntegerField('Laâyoune-Sakia El Hamra', validators=[])
    dod = IntegerField('Dakhla-Oued Ed Dahab', validators=[])

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if not self.day.data:
            self.day.data = datetime.date.today()

