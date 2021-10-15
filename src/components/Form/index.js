import { Button, IconButton, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import ClearIcon from '@material-ui/icons/Clear'
import './styles.css'
export default (props) => {
    const textType = (options) => {
        const size = options.sizes[props.size]

        return (
            <TextField
                style={{ margin: '0px 8px 10px 8px', width: size }}
                value={options.value}
                variant="outlined"
                helperText={options.helperText}
                placeholder={options.placeholder}
                label={options.label}
                type={options.rules.type}></TextField>
        )
    }

    return props.multiple ? (
        <div
            style={{
                width: '100%',
                textAlign: 'left',
                padding: '10px',
                boxSizing: 'border-box',
            }}>
            {props.heading && (
                <Typography
                    variant="h4"
                    style={{ marginBottom: '10px' }}
                    gutterBottom={true}>
                    {props.heading}
                </Typography>
            )}
            {props.templet.map((templet, ind) => {
                return (
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            boxSizing: 'border-box',
                            padding: '10px 10px',
                            marginBottom: '10px',
                            justifyContent: 'space-between',
                        }}>
                        <div
                            style={{
                                width: '100%',
                                padding: '0px 0px 10px',
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                            <Typography color="textSecondary" variant="h6">{`${
                                props.heading
                            } - ${ind + 1}`}</Typography>
                            <IconButton
                                onClick={() => {
                                    props.removeSection(props.index, ind)
                                }}
                                color="secondary"
                                style={{ margin: '8px' }}
                                disabled={ind === 0}>
                                <ClearIcon
                                    color={ind === 0 ? 'disabled' : 'secondary'}
                                />
                            </IconButton>
                        </div>
                        {templet.map((val, ind) => {
                            if (val.type === 'text-field') return textType(val)
                        })}
                    </div>
                )
            })}

            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom:'20px'
                }}>
                <Button
                    style={{ width: '95%', }}
                    onClick={() => {
                        props.addNewSection(props.index)
                    }}
                    variant="outlined"
                    color="primary">{`Add New ${props.heading}`}</Button>
            </div>
        </div>
    ) : (
        <div
            style={{
                width: '100%',
                textAlign: 'left',
                padding: '10px',
                boxSizing: 'border-box',
            }}>
            {props.heading && (
                <Typography variant="h4" gutterBottom={true}>
                    {props.heading}
                </Typography>
            )}
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    boxSizing: 'border-box',
                    padding: '20px 10px',
                    justifyContent: 'space-between',
                }}>
                {props.templet.map((val, ind) => {
                    if (val.type === 'text-field') return textType(val)
                })}
            </div>
        </div>
    )
}
